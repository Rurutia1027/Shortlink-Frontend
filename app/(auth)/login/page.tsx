'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Form, Input, Button, Checkbox, message, Modal } from 'antd'
import { useAuth } from '@/src/hooks/useAuth'
import { setToken, setUsername } from '@/src/lib/auth'
import { login as loginApi, addUser as registerApi, hasUsername } from '@/src/api'
import type { LoginRequest, RegisterRequest } from '@/src/api/types'
import styles from './login.module.css'

/**
 * Login Page
 * Route: /login
 * Matches Vue: views/login/LoginIndex.vue
 */
export default function LoginPage() {
  const router = useRouter()
  const { login, register } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [loginForm] = Form.useForm()
  const [registerForm] = Form.useForm()
  const moveRef = useRef<HTMLDivElement>(null)

  // Toggle between login and registration
  const toggleMode = () => {
    setIsLogin(!isLogin)
    if (moveRef.current) {
      if (isLogin) {
        moveRef.current.style.transform = 'translate(-420px, 0)'
      } else {
        moveRef.current.style.transform = 'translate(0, 0)'
      }
    }
  }

  // Handle login
  const handleLogin = async (values: LoginRequest) => {
    setLoading(true)
    try {
      await login({ ...values, rememberMe })
      message.success('Login successful!')
      router.push('/home')
    } catch (error: any) {
      if (error.message === 'User already logged in' || error.message?.includes('already logged in')) {
        message.warning('User is already logged in elsewhere, please do not login repeatedly!')
      } else if (error.message === 'User not found' || error.message?.includes('not exist')) {
        message.error('Please enter correct username and password!')
      } else {
        message.error(error.message || 'Login failed!')
      }
    } finally {
      setLoading(false)
    }
  }

  // Handle registration
  const handleRegister = async (values: RegisterRequest & { phone?: string; realName?: string; mail?: string }) => {
    setLoading(true)
    try {
      // Check if username already exists
      // Vue: res1.data.success !== false means username exists
      const usernameCheck = await hasUsername({ username: values.username })
      // API returns ApiResponse, so we need to check the nested data structure
      const responseData = usernameCheck.data as any
      // If success is not false (truthy or undefined), username exists
      if (responseData && responseData.success !== false) {
        message.error('Username already exists!')
        setLoading(false)
        return
      }

      // Register user
      await register({
        username: values.username,
        password: values.password,
      })

      // Auto login after registration
      const loginData: LoginRequest = {
        username: values.username,
        password: values.password,
        rememberMe: true,
      }
      
      // Save to localStorage (matching Vue behavior)
      if (typeof window !== 'undefined') {
        const loginResponse = await loginApi(loginData)
        const token = loginResponse.data?.token
        if (token) {
          setToken(token, true)
          setUsername(values.username, true)
          localStorage.setItem('token', token)
          localStorage.setItem('username', values.username)
        }
      }

      message.success('Registration and login successful!')
      router.push('/home')
    } catch (error: any) {
      message.error(error.message || 'Registration failed!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.loginPage}>
      <h1 className={styles.title}>Shortlink SaaS Platform</h1>
      
      <div className={styles.loginBox}>
        {/* Login Form */}
        <div className={`${styles.logon} ${!isLogin ? styles.hidden : ''}`}>
          <h2>User Login</h2>
          <Form
            form={loginForm}
            layout="vertical"
            onFinish={handleLogin}
            initialValues={{
              username: 'admin',
              password: 'admin123456',
            }}
          >
            <div className={styles.formContainer}>
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please enter username' }]}
              >
                <Input
                  prefix="Username"
                  placeholder="Please enter username"
                  maxLength={11}
                  showCount
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please enter password' },
                  { min: 8, max: 15, message: 'Password must be 8-15 characters' },
                ]}
              >
                <Input.Password
                  prefix="Password"
                  placeholder="Please enter password"
                  size="large"
                  style={{ marginTop: '20px' }}
                />
              </Form.Item>
            </div>

            <div className={styles.btnGroup}>
              <div>
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ color: '#a0a0a0' }}
                >
                  Remember Password
                </Checkbox>
              </div>
              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  style={{ width: '100px' }}
                >
                  Login
                </Button>
              </div>
            </div>
          </Form>
        </div>

        {/* Registration Form */}
        <div className={`${styles.register} ${isLogin ? styles.hidden : ''}`}>
          <h2>User Registration</h2>
          <Form
            form={registerForm}
            layout="vertical"
            onFinish={handleRegister}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please enter username' }]}
            >
              <Input
                prefix="Username"
                placeholder="Please enter username"
                maxLength={11}
                showCount
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="mail"
              rules={[
                { required: true, message: 'Please enter email' },
                {
                  pattern: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
                  message: 'Please enter valid email',
                },
              ]}
            >
              <Input
                prefix="Email"
                placeholder="Please enter email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[
                { required: true, message: 'Please enter phone number' },
                {
                  pattern: /^1[3|5|7|8|9]\d{9}$/,
                  message: 'Please enter valid phone number',
                },
                { len: 11, message: 'Phone number must be 11 digits' },
              ]}
            >
              <Input
                prefix="Phone"
                placeholder="Please enter phone number"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="realName"
              rules={[{ required: true, message: 'Please enter name' }]}
            >
              <Input
                prefix="Name"
                placeholder="Please enter name"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please enter password' },
                { min: 8, max: 15, message: 'Password must be 8-15 characters' },
              ]}
            >
              <Input.Password
                prefix="Password"
                placeholder="Please enter password"
                size="large"
              />
            </Form.Item>

            <div className={styles.btnGroup}>
              <div></div>
              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  style={{ width: '100px' }}
                >
                  Register
                </Button>
              </div>
            </div>
          </Form>
        </div>

        {/* Toggle Button */}
        <div ref={moveRef} className={styles.move}>
          <span style={{ fontSize: '18px', marginBottom: '25px', color: 'rgb(225, 238, 250)' }}>
            {!isLogin ? 'Already have an account?' : "Don't have an account?"}
          </span>
          <span style={{ fontSize: '16px', color: 'rgb(225, 238, 250)' }}>
            {!isLogin ? 'Welcome to login!' : 'Welcome to register!'}
          </span>
          <Button
            style={{ width: '100px', marginTop: '30px' }}
            onClick={toggleMode}
          >
            {!isLogin ? 'Go to Login' : 'Go to Register'}
          </Button>
        </div>
      </div>
      
      {/* Background gradient (replacing vanta) */}
      <div className={styles.background}></div>
    </div>
  )
}
