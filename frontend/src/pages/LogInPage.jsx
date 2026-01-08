import { useAuthStore } from '../store/useAuthStore'

function logInPage() {
    const {authUser, isLoading, login} = useAuthStore()
    return <div>LogInPage</div>
}

export default logInPage
