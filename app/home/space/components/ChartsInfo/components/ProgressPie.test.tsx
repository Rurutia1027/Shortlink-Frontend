/// <reference types="jest" />
import { render, screen } from '@testing-library/react'
import ProgressPie from './ProgressPie'

// Mock Ant Design Progress
jest.mock('antd', () => {
  const antd = jest.requireActual('antd')
  return {
    ...antd,
    Progress: ({ percent, format }: any) => (
      <div data-testid="ant-progress" data-percent={percent}>
        {format && format()}
      </div>
    ),
  }
})

describe('ProgressPie Component', () => {
  it('renders two progress circles', () => {
    const labels = ['新访客', '旧访客']
    const data = [60, 40]
    
    render(<ProgressPie labels={labels} data={data} />)
    
    const progressCircles = screen.getAllByTestId('ant-progress')
    expect(progressCircles).toHaveLength(2)
  })

  it('calculates percentages correctly', () => {
    const labels = ['新访客', '旧访客']
    const data = [60, 40] // 60 + 40 = 100
    
    render(<ProgressPie labels={labels} data={data} />)
    
    const progressCircles = screen.getAllByTestId('ant-progress')
    expect(progressCircles[0]).toHaveAttribute('data-percent', '60')
    expect(progressCircles[1]).toHaveAttribute('data-percent', '40')
  })

  it('displays labels correctly', () => {
    const labels = ['新访客', '旧访客']
    const data = [60, 40]
    
    render(<ProgressPie labels={labels} data={data} />)
    
    expect(screen.getByText(/新访客/)).toBeInTheDocument()
    expect(screen.getByText(/旧访客/)).toBeInTheDocument()
  })

  it('displays data values with correct units', () => {
    const labels = ['新访客', '旧访客']
    const data = [60, 40]
    
    render(<ProgressPie labels={labels} data={data} />)
    
    // 新访客 uses '人', 旧访客 uses '人'
    expect(screen.getByText(/60 人/)).toBeInTheDocument()
    expect(screen.getByText(/40 人/)).toBeInTheDocument()
  })

  it('handles zero values', () => {
    const labels = ['新访客', '旧访客']
    const data = [0, 0]
    
    render(<ProgressPie labels={labels} data={data} />)
    
    const progressCircles = screen.getAllByTestId('ant-progress')
    expect(progressCircles[0]).toHaveAttribute('data-percent', '0')
    expect(progressCircles[1]).toHaveAttribute('data-percent', '0')
  })

  it('handles empty data array', () => {
    const labels = ['数据1', '数据2']
    const data: number[] = []
    
    render(<ProgressPie labels={labels} data={data} />)
    
    const progressCircles = screen.getAllByTestId('ant-progress')
    expect(progressCircles[0]).toHaveAttribute('data-percent', '0')
    expect(progressCircles[1]).toHaveAttribute('data-percent', '0')
  })

  it('handles missing labels', () => {
    const labels: string[] = []
    const data = [60, 40]
    
    render(<ProgressPie labels={labels} data={data} />)
    
    expect(screen.getByText(/数据1/)).toBeInTheDocument()
    expect(screen.getByText(/数据2/)).toBeInTheDocument()
  })

  it('applies custom style prop', () => {
    const labels = ['新访客', '旧访客']
    const data = [60, 40]
    const customStyle = { margin: '20px' }
    
    const { container } = render(<ProgressPie labels={labels} data={data} style={customStyle} />)
    
    const mainDiv = container.firstChild as HTMLElement
    expect(mainDiv).toHaveStyle('margin: 20px')
  })

  it('calculates percentage correctly for uneven values', () => {
    const labels = ['新访客', '旧访客']
    const data = [30, 70] // 30 + 70 = 100
    
    render(<ProgressPie labels={labels} data={data} />)
    
    const progressCircles = screen.getAllByTestId('ant-progress')
    expect(progressCircles[0]).toHaveAttribute('data-percent', '30')
    expect(progressCircles[1]).toHaveAttribute('data-percent', '70')
  })
})
