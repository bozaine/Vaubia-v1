export const auth = {
  isAuthed() { return !!localStorage.getItem('vaubia_session') },
  login(email, password) {
    if (!email || !password) throw new Error('missing')
    localStorage.setItem('vaubia_session', JSON.stringify({ email, at: Date.now() }))
    return true
  },
  logout(){ localStorage.removeItem('vaubia_session') },
  signup(email, password){
    // pretend backend; store a profile
    const users = JSON.parse(localStorage.getItem('vaubia_users') || '[]')
    if (users.find(u => u.email === email)) throw new Error('exists')
    users.push({ email, createdAt: Date.now() })
    localStorage.setItem('vaubia_users', JSON.stringify(users))
    return true
  }
}
