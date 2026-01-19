'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Dropdown,
  Popconfirm,
  Tooltip,
  Pagination,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import {
  DeleteOutlined,
  EditOutlined,
  BarChartOutlined,
  ShareAltOutlined,
  VerticalAlignMiddleOutlined,
  PlusOutlined,
  QrcodeOutlined,
} from '@ant-design/icons'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useGroups } from '@/src/store/useStore'
import {
  queryGroup,
  addGroup,
  editGroup,
  deleteGroup,
  sortGroup,
  queryGroupStats,
  queryGroupTable,
} from '@/src/api'
import {
  queryPage,
  queryRecycleBin,
  toRecycleBin,
  recoverLink,
  removeLink,
  queryLinkStats,
  queryLinkTable,
} from '@/src/api'
import { useDomain } from '@/src/store/useStore'
import { getTodayFormatDate, getLastWeekFormatDate, truncateText } from '@/src/lib/utils'
import type { Group, ShortLink } from '@/src/api/types'
import QRCode from './components/QRCode/QRCode'
import styles from './space.module.css'

/**
 * My Space Page - Short Link Management
 * Route: /home/space
 * Matches Vue: views/mySpace/MySpaceIndex.vue
 */
export default function MySpacePage() {
  const { groups, setGroups, selectedGroupId, setSelectedGroupId } = useGroups()
  const { domain } = useDomain()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isRecycleBin, setIsRecycleBin] = useState(false)
  const [tableData, setTableData] = useState<ShortLink[]>([])
  const [loading, setLoading] = useState(false)
  const [totalNums, setTotalNums] = useState(0)
  const [recycleBinNums, setRecycleBinNums] = useState(0)

  // Pagination
  const [pageParams, setPageParams] = useState({
    gid: null as string | null,
    current: 1,
    size: 15,
    orderTag: null as string | null,
  })

  // Modals
  const [isAddGroup, setIsAddGroup] = useState(false)
  const [isEditGroup, setIsEditGroup] = useState(false)
  const [isAddSmallLink, setIsAddSmallLink] = useState(false)
  const [isEditLink, setIsEditLink] = useState(false)
  const [isAddSmallLinks, setIsAddSmallLinks] = useState(false)
  const [qrCodeVisible, setQrCodeVisible] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState('')

  // Forms
  const [groupForm] = Form.useForm()
  const [editGroupForm] = Form.useForm()

  // Drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // Load groups
  const loadGroups = useCallback(async () => {
    try {
      const res = await queryGroup()
      // API returns ApiResponse, so we need res.data
      const responseData = res.data as any
      const groupList = (responseData.data || responseData || []).reverse()
      setGroups(groupList)
      
      // Set default selected group
      if (groupList.length > 0 && selectedIndex < groupList.length) {
        setSelectedGroupId(groupList[selectedIndex]?.gid || null)
        setPageParams((prev) => ({ ...prev, gid: groupList[selectedIndex]?.gid || null }))
      }
    } catch (error) {
      message.error('Failed to load groups')
    }
  }, [setGroups, setSelectedGroupId, selectedIndex])

  // Load table data
  const loadTableData = useCallback(async () => {
    setLoading(true)
    try {
      const params: any = {
        current: pageParams.current,
        size: pageParams.size,
        gid: pageParams.gid,
      }
      if (pageParams.orderTag) {
        params.orderTag = pageParams.orderTag
      }

      const res = await queryPage(params)
      // API returns ApiResponse, check the nested structure
      const responseData = res.data as any
      
      // Vue: res?.data.success means res.data.success
      if (responseData?.success) {
        setTableData(responseData.data?.records || responseData.data?.list || [])
        setTotalNums(Number(responseData.data?.total) || 0)
      } else {
        message.error(responseData?.message || 'Failed to load data')
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [pageParams])

  // Load recycle bin
  const loadRecycleBin = useCallback(async () => {
    setLoading(true)
    try {
      const res = await queryRecycleBin({
        current: pageParams.current,
        size: pageParams.size,
      })
      const responseData = res.data as any
      
      // Vue: res.data?.data?.records
      setTableData(responseData.data?.records || responseData.data?.list || [])
      const total = Number(responseData.data?.total) || 0
      setTotalNums(total)
      setRecycleBinNums(total)
    } catch (error: any) {
      message.error(error.message || 'Failed to load recycle bin')
    } finally {
      setLoading(false)
    }
  }, [pageParams.current, pageParams.size])

  useEffect(() => {
    loadGroups()
  }, [loadGroups])

  useEffect(() => {
    if (!isRecycleBin && selectedIndex !== -1) {
      loadTableData()
    } else if (isRecycleBin) {
      loadRecycleBin()
    }
  }, [isRecycleBin, selectedIndex, pageParams, loadTableData, loadRecycleBin])

  // Handle group selection
  const handleGroupSelect = (index: number) => {
    setSelectedIndex(index)
    setIsRecycleBin(false)
    if (groups[index]) {
      setSelectedGroupId(groups[index].gid || null)
      setPageParams((prev) => ({
        ...prev,
        gid: groups[index].gid || null,
        current: 1,
      }))
    }
  }

  // Handle recycle bin click
  const handleRecycleBin = () => {
    setIsRecycleBin(true)
    setSelectedIndex(-1)
    setSelectedGroupId(null)
    setPageParams((prev) => ({
      ...prev,
      gid: null,
      current: 1,
    }))
  }

  // Add group
  const handleAddGroup = async (values: { name: string }) => {
    try {
      const res = await addGroup({ name: values.name })
      const responseData = res.data as any
      
      if (responseData?.success) {
        message.success('Group added successfully')
        setIsAddGroup(false)
        groupForm.resetFields()
        await loadGroups()
      } else {
        message.error(responseData?.message || 'Failed to add group')
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to add group')
    }
  }

  // Edit group
  const handleEditGroup = async (values: { name: string }) => {
    try {
      const editGid = editGroupForm.getFieldValue('gid')
      const res = await editGroup({ id: editGid, name: values.name })
      const responseData = res.data as any
      
      if (responseData?.success) {
        message.success('Group updated successfully')
        setIsEditGroup(false)
        editGroupForm.resetFields()
        await loadGroups()
      } else {
        message.error(responseData?.message || 'Failed to update group')
      }
    } catch (error: any) {
      message.error(error.message || 'Failed to update group')
    }
  }

  // Delete group
  const handleDeleteGroup = async (gid: string) => {
    try {
      await deleteGroup({ id: gid })
      message.success('Group deleted successfully')
      setSelectedIndex(0)
      await loadGroups()
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to delete group'
      message.error(errorMsg)
    }
  }

  // Show edit group modal
  const showEditGroup = (gid: string, name: string) => {
    editGroupForm.setFieldsValue({ gid, name })
    setIsEditGroup(true)
  }

  // Drag end handler
  const handleDragEnd = async (event: any) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = groups.findIndex((g) => g.gid === active.id)
      const newIndex = groups.findIndex((g) => g.gid === over.id)

      if (oldIndex !== -1 && newIndex !== -1) {
        // Update local state
        const newGroups = arrayMove(groups, oldIndex, newIndex)
        newGroups.forEach((group, index) => {
          group.sortOrder = index
        })
        setGroups(newGroups)

        // Update selected index
        if (selectedIndex === oldIndex) {
          setSelectedIndex(newIndex)
        } else if (oldIndex < newIndex && selectedIndex > oldIndex && selectedIndex <= newIndex) {
          setSelectedIndex(selectedIndex - 1)
        } else if (oldIndex > newIndex && selectedIndex < oldIndex && selectedIndex >= newIndex) {
          setSelectedIndex(selectedIndex + 1)
        }

        // Send to API
        try {
          await sortGroup(newGroups)
        } catch (error) {
          message.error('Failed to update group order')
          // Revert on error
          await loadGroups()
        }
      }
    }
  }

  // Move to recycle bin
  const handleMoveToRecycleBin = async (record: ShortLink) => {
    try {
      await toRecycleBin({
        id: record.id || '',
        gid: record.gid || '',
        fullShortUrl: record.fullShortUrl || '',
      })
      message.success('Moved to recycle bin')
      await loadTableData()
      await loadGroups()
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to delete'
      message.error(errorMsg)
    }
  }

  // Restore from recycle bin
  const handleRestore = async (record: ShortLink) => {
    try {
      await recoverLink({
        id: record.id || '',
        gid: record.gid || '',
        fullShortUrl: record.fullShortUrl || '',
      })
      message.success('Restored successfully')
      await loadRecycleBin()
      await loadGroups()
    } catch (error: any) {
      message.error(error.message || 'Failed to restore')
    }
  }

  // Permanently delete
  const handlePermanentDelete = async (record: ShortLink) => {
    try {
      await removeLink({
        id: record.id || '',
        gid: record.gid || '',
        fullShortUrl: record.fullShortUrl || '',
      })
      message.success('Deleted permanently')
      await loadRecycleBin()
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to delete'
      message.error(errorMsg)
    }
  }

  // Copy URL
  const handleCopyUrl = (url: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        message.success('Link copied!')
      })
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      message.success('Link copied!')
    }
  }

  // Check if expired
  const isExpired = (validDate?: string): boolean => {
    if (!validDate) return true
    const date = new Date(validDate).getTime()
    return new Date().getTime() < date
  }

  // Get image URL
  const getImgUrl = (url?: string): string => {
    return url || '/images/default-link-icon.png'
  }

  // Table columns
  const columns: ColumnsType<ShortLink> = [
    {
      title: 'Short Link Info',
      dataIndex: 'describe',
      key: 'info',
      width: 300,
      render: (_, record) => (
        <div className={styles.tableLinkBox}>
          <img
            src={getImgUrl(record.favicon)}
            width={20}
            height={20}
            alt=""
            style={{ marginRight: '10px' }}
          />
          <div className={styles.nameDate}>
            <Tooltip title={record.describe}>
              <span>{truncateText(record.describe || '', 30)}</span>
            </Tooltip>
            <div className={styles.time}>
              <span>{record.createTime || record.createdAt}</span>
              {record.validDate && !isExpired(record.validDate) && (
                <Tooltip title={`Expires: ${record.validDate}`}>
                  <span className={styles.expiredBadge}>Expired</span>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Short Link URL',
      dataIndex: 'fullShortUrl',
      key: 'url',
      width: 300,
      render: (_, record) => {
        const fullUrl = record.fullShortUrl
          ? `http://${record.fullShortUrl}`
          : `${domain}/${record.shortUri || record.shortCode}`
        const isDisabled = record.validDateType === 1 && !isExpired(record.validDate)

        return (
          <div className={styles.tableUrlBox}>
            <a
              href={isDisabled ? undefined : fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ pointerEvents: isDisabled ? 'none' : 'auto', opacity: isDisabled ? 0.5 : 1 }}
            >
              {record.domain || domain}/{record.shortUri || record.shortCode}
            </a>
            <Tooltip title={record.originUrl || record.originalUrl}>
              <span>{truncateText(record.originUrl || record.originalUrl || '', 50)}</span>
            </Tooltip>
          </div>
        )
      },
    },
    {
      title: 'Copy',
      key: 'copy',
      width: 170,
      render: (_, record) => {
        const fullUrl = record.fullShortUrl
          ? `http://${record.fullShortUrl}`
          : `${domain}/${record.shortUri || record.shortCode}`

        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="QR Code">
              <QrcodeOutlined
                className={styles.tableEdit}
                onClick={() => {
                  setQrCodeUrl(fullUrl)
                  setQrCodeVisible(true)
                }}
              />
            </Tooltip>
            <Tooltip title="Copy Link">
              <ShareAltOutlined
                className={styles.tableEdit}
                onClick={() => handleCopyUrl(fullUrl)}
              />
            </Tooltip>
          </div>
        )
      },
    },
    {
      title: 'Visits',
      key: 'visits',
      width: 120,
      render: (_, record) => (
        <div className={styles.timesBox}>
          <div className={styles.todayBox}>
            <span>Today</span>
            <span>{record.todayPv || 0}</span>
          </div>
          <div className={styles.totalBox}>
            <span>Total</span>
            <span>{record.totalPv || 0}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Visitors',
      key: 'visitors',
      width: 120,
      render: (_, record) => (
        <div className={styles.timesBox}>
          <div className={styles.todayBox}>
            <span>Today</span>
            <span>{record.todayUv || 0}</span>
          </div>
          <div className={styles.totalBox}>
            <span>Total</span>
            <span>{record.totalUv || 0}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'IP Count',
      key: 'ip',
      width: 120,
      render: (_, record) => (
        <div className={styles.timesBox}>
          <div className={styles.todayBox}>
            <span>Today</span>
            <span>{record.todayUip || 0}</span>
          </div>
          <div className={styles.totalBox}>
            <span>Total</span>
            <span>{record.totalUip || 0}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 180,
      fixed: 'right',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="View Charts">
            <BarChartOutlined
              className={styles.tableEdit}
              onClick={() => {
                // TODO: Show charts modal
                message.info('Charts feature coming soon')
              }}
            />
          </Tooltip>
          {!isRecycleBin && (
            <>
              <Tooltip title="Edit">
                <EditOutlined
                  className={styles.tableEdit}
                  onClick={() => {
                    // TODO: Show edit modal
                    message.info('Edit feature coming soon')
                  }}
                />
              </Tooltip>
              <Popconfirm
                title="Move to recycle bin?"
                onConfirm={() => handleMoveToRecycleBin(record)}
              >
                <Tooltip title="Delete">
                  <DeleteOutlined className={styles.tableEdit} />
                </Tooltip>
              </Popconfirm>
            </>
          )}
          {isRecycleBin && (
            <>
              <Tooltip title="Restore">
                <Button
                  type="text"
                  icon={<span>↩</span>}
                  className={styles.tableEdit}
                  onClick={() => handleRestore(record)}
                />
              </Tooltip>
              <Popconfirm
                title="This is irreversible. Are you sure?"
                onConfirm={() => handlePermanentDelete(record)}
              >
                <Tooltip title="Delete Permanently">
                  <DeleteOutlined className={styles.tableEdit} />
                </Tooltip>
              </Popconfirm>
            </>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.optionTitle}>
          <div>
            Groups <span>({groups.length} total)</span>
          </div>
          <div className={styles.hoverBox} onClick={() => setIsAddGroup(true)}>
            <PlusOutlined style={{ fontSize: '18px' }} />
          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={groups.map((g) => g.gid || '')}
            strategy={verticalListSortingStrategy}
          >
            <ul className={styles.sortOptions}>
              {groups.map((group, index) => (
                <SortableGroupItem
                  key={group.gid}
                  group={group}
                  index={index}
                  isSelected={selectedIndex === index}
                  onClick={() => handleGroupSelect(index)}
                  onEdit={() => showEditGroup(group.gid || '', group.name)}
                  onDelete={() => handleDeleteGroup(group.gid || '')}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>

        {/* Recycle Bin */}
        <div className={styles.recycleBin}>
          <div
            className={`${styles.recycleBox} ${styles.hoverBox} ${
              selectedIndex === -1 ? styles.selectedItem : ''
            }`}
            onClick={handleRecycleBin}
          >
            Recycle Bin
            <DeleteOutlined style={{ marginLeft: '5px', fontSize: '20px' }} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.contentBox}>
        <div className={styles.tableBox}>
          {!isRecycleBin && (
            <div className={styles.buttonsBox}>
              <Button
                type="primary"
                onClick={() => setIsAddSmallLink(true)}
                style={{ marginRight: '10px' }}
              >
                Create Link
              </Button>
              <Button onClick={() => setIsAddSmallLinks(true)} style={{ marginRight: '10px' }}>
                Batch Create
              </Button>
            </div>
          )}

          {isRecycleBin && (
            <div className={styles.recycleBinBox}>
              <span>Recycle Bin</span>
              <span>Total: {recycleBinNums} links</span>
            </div>
          )}

          <Table
            columns={columns}
            dataSource={tableData}
            loading={loading}
            rowKey={(record) => record.id || record.fullShortUrl || ''}
            pagination={false}
            scroll={{ y: 'calc(100vh - 340px)' }}
          />

          <div className={styles.paginationBlock}>
            <Pagination
              current={pageParams.current}
              pageSize={pageParams.size}
              total={totalNums}
              showSizeChanger
              showQuickJumper
              pageSizeOptions={['10', '15', '20', '30']}
              onChange={(page, size) => {
                setPageParams((prev) => ({ ...prev, current: page, size: size || 15 }))
              }}
              onShowSizeChange={(current, size) => {
                setPageParams((prev) => ({ ...prev, current: 1, size }))
              }}
            />
          </div>
        </div>
      </div>

      {/* Add Group Modal */}
      <Modal
        title="Create Group"
        open={isAddGroup}
        onCancel={() => {
          setIsAddGroup(false)
          groupForm.resetFields()
        }}
        onOk={() => groupForm.submit()}
      >
        <Form form={groupForm} onFinish={handleAddGroup}>
          <Form.Item
            name="name"
            label="Group Name"
            rules={[{ required: true, message: 'Please enter group name' }]}
          >
            <Input placeholder="Enter group name" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Group Modal */}
      <Modal
        title="Edit Group"
        open={isEditGroup}
        onCancel={() => {
          setIsEditGroup(false)
          editGroupForm.resetFields()
        }}
        onOk={() => editGroupForm.submit()}
      >
        <Form form={editGroupForm} onFinish={handleEditGroup}>
          <Form.Item name="gid" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Group Name"
            rules={[{ required: true, message: 'Please enter group name' }]}
          >
            <Input placeholder="Enter group name" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Create/Edit Link Modals - TODO: Implement child components */}
      <Modal
        title="Create Link"
        open={isAddSmallLink}
        onCancel={() => setIsAddSmallLink(false)}
        footer={null}
        width={800}
      >
        <p>Create link form will be implemented as a separate component</p>
      </Modal>

      <Modal
        title="Batch Create Links"
        open={isAddSmallLinks}
        onCancel={() => setIsAddSmallLinks(false)}
        footer={null}
        width={800}
      >
        <p>Batch create form will be implemented as a separate component</p>
      </Modal>

      <Modal
        title="Edit Link"
        open={isEditLink}
        onCancel={() => setIsEditLink(false)}
        footer={null}
        width={800}
      >
        <p>Edit link form will be implemented as a separate component</p>
      </Modal>

      {/* QR Code Modal */}
      <QRCode
        url={qrCodeUrl}
        visible={qrCodeVisible}
        onClose={() => setQrCodeVisible(false)}
      />
    </div>
  )
}

// Sortable Group Item Component
function SortableGroupItem({
  group,
  index,
  isSelected,
  onClick,
  onEdit,
  onDelete,
}: {
  group: Group
  index: number
  isSelected: boolean
  onClick: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: group.gid || '',
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const menuItems = [
    {
      key: 'edit',
      label: 'Edit',
      onClick: onEdit,
    },
    {
      key: 'delete',
      label: 'Delete',
      onClick: onDelete,
      danger: true,
    },
  ]

  return (
    <li ref={setNodeRef} style={style} {...attributes}>
      <div
        className={`${styles.itemBox} ${isSelected ? styles.selectedItem : ''} ${styles.hoverBox}`}
        onClick={onClick}
      >
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <div {...listeners} style={{ cursor: 'grab', marginRight: '5px' }}>
            <VerticalAlignMiddleOutlined style={{ fontSize: '13px' }} />
          </div>
          <span className={styles.overText} title={group.name}>
            {truncateText(group.name, 15)}
          </span>
        </div>
        <div className={styles.flexBox}>
          {group.shortLinkCount !== 0 && group.shortLinkCount !== null && (
            <Tooltip title="View Charts">
              <BarChartOutlined
                className={styles.edit}
                onClick={(e) => {
                  e.stopPropagation()
                  // TODO: Show charts
                }}
              />
            </Tooltip>
          )}
          {group.title !== 'Default Group' && (
            <Dropdown menu={{ items: menuItems }} trigger={['click']}>
              <EditOutlined
                className={styles.edit}
                onClick={(e) => {
                  e.stopPropagation()
                }}
              />
            </Dropdown>
          )}
          <span className={styles.itemLength}>{group.shortLinkCount ?? 0}</span>
        </div>
      </div>
    </li>
  )
}
