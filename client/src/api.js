const token = () => localStorage.getItem('tw_token') || ''
const API_BASE = String(import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')
const request = async (path, options = {}) => {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) }
  if (token()) headers.Authorization = `Bearer ${token()}`
  let res
  try {
    res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  } catch (error) {
    throw new Error(`Tiffin Wallah API is not reachable at ${API_BASE}. Start the backend or set VITE_API_BASE_URL for the deployed frontend.`)
  }
  const data = await res.json().catch(() => ({}))
  if (res.status === 401 && token()) {
    localStorage.removeItem('tw_token')
    localStorage.removeItem('tw_user')
    window.dispatchEvent(new Event('tw-auth'))
  }
  if (!res.ok) throw new Error(data.message || 'Something went wrong')
  return data
}
export const getMenu = () => request('/menu')
export const getLaundry = () => request('/laundry')
export const registerUser = payload => request('/auth/register',{method:'POST',body:JSON.stringify(payload)})
export const loginUser = payload => request('/auth/login',{method:'POST',body:JSON.stringify(payload)})
export const getMe = () => request('/auth/me')
export const createBooking = payload => request('/bookings',{method:'POST',body:JSON.stringify(payload)})
export const createRazorpayOrder = orderId => request(`/bookings/${encodeURIComponent(orderId)}/pay`,{method:'POST',body:JSON.stringify({})})
export const verifyRazorpayPayment = (orderId,payload) => request(`/bookings/${encodeURIComponent(orderId)}/verify-payment`,{method:'POST',body:JSON.stringify(payload)})
export const getMyBookings = () => request('/bookings/my')
export const checkBookingPayment = orderId => request(`/bookings/${encodeURIComponent(orderId)}/payment-status`)
export const getBookings = () => request('/bookings')
export const updateBookingStatus = (orderId,status) => request(`/admin/bookings/${encodeURIComponent(orderId)}/status`,{method:'PUT',body:JSON.stringify({status})})
export const updateMenu = payload => request('/admin/menu',{method:'PUT',body:JSON.stringify(payload)})
export const updateLaundry = items => request('/admin/laundry',{method:'PUT',body:JSON.stringify({items})})
export const getUsers = () => request('/admin/users')
export const updateUserRole = (id,role) => request(`/admin/users/${id}/role`,{method:'PUT',body:JSON.stringify({role})})
export const deleteUser = id => request(`/admin/users/${id}`,{method:'DELETE'})
export const getAdminReviews = () => request('/admin/reviews')
export const updateAdminReview = (id,payload) => request(`/admin/reviews/${encodeURIComponent(id)}`,{method:'PUT',body:JSON.stringify(payload)})
export const notifyUnpaidCustomers = () => request('/admin/notifications/unpaid',{method:'POST',body:JSON.stringify({})})
export const createFeedback = payload => request('/feedback',{method:'POST',body:JSON.stringify(payload)})
export const getFeedback = () => request('/feedback')
export const getReviews = () => request('/reviews')
export const createReview = payload => request('/reviews',{method:'POST',body:JSON.stringify(payload)})
export const updateProfile = payload => request('/auth/profile',{method:'PUT',body:JSON.stringify(payload)})
export const forgotPassword = email => request('/auth/forgot-password',{method:'POST',body:JSON.stringify({email})})
export const resetPassword = (token,password) => request('/auth/reset-password',{method:'POST',body:JSON.stringify({token,password})})

export const getAddresses = () => request('/auth/addresses')
export const addAddress = payload => request('/auth/addresses',{method:'POST',body:JSON.stringify(payload)})
export const setDefaultAddress = id => request(`/auth/addresses/${encodeURIComponent(id)}/default`,{method:'PUT',body:JSON.stringify({})})
export const deleteAddress = id => request(`/auth/addresses/${encodeURIComponent(id)}`,{method:'DELETE'})
export const changePassword = payload => request('/auth/change-password',{method:'PUT',body:JSON.stringify(payload)})
export const claimOffer = orderId => request(`/bookings/${encodeURIComponent(orderId)}/claim-offer`,{method:'POST',body:JSON.stringify({})})
export const getRules = () => request('/rules')
export const getAdminRules = () => request('/admin/rules')
export const updateAdminRules = rulesBook => request('/admin/rules',{method:'PUT',body:JSON.stringify({rulesBook})})

export const getServiceAddresses = () => request('/service-addresses')
export const requestPause = (orderId,payload) => request(`/bookings/${encodeURIComponent(orderId)}/pause`,{method:'POST',body:JSON.stringify(payload)})
export const claimReferralOffer = orderId => request(`/bookings/${encodeURIComponent(orderId)}/referral-offer/claim`,{method:'POST',body:JSON.stringify({})})
export const approvePause = (orderId,index,action) => request(`/admin/bookings/${encodeURIComponent(orderId)}/pause`,{method:'PUT',body:JSON.stringify({index,action})})
export const getPaymentWindow = () => request('/payment-window')
export const validateReferral = code => request('/coupons/validate',{method:'POST',body:JSON.stringify({code,service:'monthly-tiffin'})})

export const getDeliveryPartners = () => request('/admin/delivery-partners')
export const createDeliveryPartner = payload => request('/admin/delivery-partners',{method:'POST',body:JSON.stringify(payload)})
export const updateDeliveryPartner = (id,payload) => request(`/admin/delivery-partners/${encodeURIComponent(id)}`,{method:'PUT',body:JSON.stringify(payload)})
export const assignDeliveryPartner = (orderId,partnerId) => request(`/admin/bookings/${encodeURIComponent(orderId)}/delivery`,{method:'PUT',body:JSON.stringify({partnerId})})
export const getDeliveryOrders = () => request('/delivery/orders')
export const updateDeliveryOrderStatus = (orderId,status) => request(`/delivery/orders/${encodeURIComponent(orderId)}/status`,{method:'PUT',body:JSON.stringify({status})})

export const resetDeliveryPartnerPassword = (id,payload={}) => request(`/admin/delivery-partners/${encodeURIComponent(id)}/reset-password`,{method:'POST',body:JSON.stringify(payload)})
export const deleteDeliveryPartner = id => request(`/admin/delivery-partners/${encodeURIComponent(id)}`,{method:'DELETE'})
export const getDeliverySettings = () => request('/admin/delivery-settings')
export const updateDeliverySettings = payload => request('/admin/delivery-settings',{method:'PUT',body:JSON.stringify(payload)})
export const autoDivideDeliveries = () => request('/admin/delivery/auto-divide',{method:'POST',body:JSON.stringify({})})

export const getSubscriptionCalendar = month => request(`/subscriptions/calendar?month=${encodeURIComponent(month)}`)
export const getScheduledMenus = (from,to) => request(`/menu/schedule?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)
export const saveScheduledMenu = payload => request('/admin/menu/schedule',{method:'PUT',body:JSON.stringify(payload)})
export const getLiveOrders = (page=1) => request(`/admin/orders/live?page=${page}`)
