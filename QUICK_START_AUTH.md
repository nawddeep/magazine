# Quick Start: Authentication System

## 🚀 Getting Started in 30 Seconds

### Step 1: Start the App
```bash
npm run dev
```

### Step 2: Access Admin Login
Navigate to: `http://localhost:3000/admin/login`

Or click the **User Icon** in the top navigation bar

### Step 3: Login
```
Email: admin@vanguard.editorial
Password: admin123
```

### Step 4: Access Admin Dashboard
After successful login, you'll be redirected to the admin dashboard automatically.

## 🔑 Quick Reference

### Routes
| Route | Description | Access |
|-------|-------------|--------|
| `/` | Public homepage | Everyone |
| `/admin/login` | Admin login page | Everyone |
| `/admin/dashboard` | Admin dashboard | Authenticated only |

### Default Credentials
- **Email**: `admin@vanguard.editorial`
- **Password**: `admin123`

### Key Features
- ✅ Protected admin routes
- ✅ Login state persistence
- ✅ Automatic redirects
- ✅ Logout functionality
- ✅ Professional login UI

## 🎯 Common Tasks

### How to Login
1. Click user icon in navbar
2. Enter credentials
3. Click "Access Admin Dashboard"
4. You're in! 🎉

### How to Logout
1. In admin dashboard, find the sidebar
2. Click "Logout" button
3. You'll be redirected to homepage

### How to Access Admin Dashboard Directly
1. Go to `/admin/dashboard`
2. If not logged in, you'll be redirected to login
3. Login and you'll return to dashboard

### How to Check if Logged In
Refresh the page. If you stay on the admin dashboard, you're logged in.

## 🛡️ Security Notes

### Current (Development)
- Credentials in frontend code
- localStorage for session
- Basic validation

### For Production
- Move auth to server
- Use JWT tokens
- Implement HTTPS
- Add rate limiting
- Use environment variables

## 📱 UI Components

### Login Page Features
- Email input with icon
- Password input with show/hide toggle
- Submit button with loading state
- Error message display
- Back to homepage link
- Demo credentials helper

### Admin Dashboard Features
- Metrics overview
- Issue manager
- Subscriber management
- Settings panel
- Logout button
- User info display

## 🔄 State Management

### Context API
```typescript
const { isAdmin, logout } = useAuth();
```

### localStorage Keys
- `vanguard_auth` - Authentication status
- `vanguard_user` - User data (email, role)

## 🐛 Troubleshooting

### Can't access admin dashboard?
- Make sure you're logged in
- Check credentials are correct
- Clear browser cache if issues persist

### Stuck on login page?
- Verify credentials match exactly
- Check browser console for errors
- Try refreshing the page

### Lost session after refresh?
- Check localStorage is enabled
- Verify no browser extensions blocking storage
- Check browser console for errors

## 📚 Documentation

For more details, see:
- `AUTHENTICATION_SYSTEM.md` - Complete documentation
- `AUTH_FLOW_DIAGRAM.md` - Visual flow diagrams
- `AUTH_IMPLEMENTATION_SUMMARY.md` - Implementation details

## ✅ Testing Checklist

Quick tests to verify everything works:

- [ ] Navigate to homepage
- [ ] Click user icon → redirects to login
- [ ] Enter wrong password → shows error
- [ ] Enter correct credentials → redirects to dashboard
- [ ] Refresh page → stays logged in
- [ ] Click logout → redirects to homepage
- [ ] Try accessing `/admin/dashboard` without login → redirects to login
- [ ] Login and access dashboard → success

## 💡 Tips

1. **Keep browser console open** during testing to see any errors
2. **Use incognito mode** to test fresh sessions
3. **Test browser back button** to verify navigation works
4. **Try direct URL access** to test route protection
5. **Clear localStorage** if you need to reset state

## 🎨 Customization

### Change Credentials
Edit `src/context/AuthContext.tsx`:
```typescript
const ADMIN_CREDENTIALS = {
  email: 'your-email@domain.com',
  password: 'your-password'
};
```

### Modify Login UI
Edit `src/components/AdminLogin.tsx`

### Update Dashboard
Edit `src/components/AdminDashboard.tsx`

---

**Quick Help**: If stuck, check the documentation files or browser console  
**Status**: ✅ Ready to use  
**Last Updated**: June 25, 2026
