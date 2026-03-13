import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('bl_admin_token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

api.interceptors.response.use(
  r => r,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('bl_admin_token')
      localStorage.removeItem('bl_admin_user')
      window.location.href = '/'
    }
    return Promise.reject(err)
  }
)

export const authAPI = {
  login: d => api.post('/auth/login', d),
}

export const adminAPI = {
  getStats:          ()               => api.get('/admin/stats'),
  getProducts:       ()               => api.get('/admin/products'),
  createProduct:     d                => api.post('/admin/products', d),
  updateProduct:     (id, d)          => api.put(`/admin/products/${id}`, d),
  deleteProduct:     id               => api.delete(`/admin/products/${id}`),
  getCategories:     ()               => api.get('/admin/categories'),
  createCategory:    d                => api.post('/admin/categories', d),
  getOrders:         ()               => api.get('/admin/orders'),
  updateOrderStatus: (id, status)     => api.put(`/admin/orders/${id}/status`, { status }),
  getUsers:          ()               => api.get('/admin/users'),
}

export default api