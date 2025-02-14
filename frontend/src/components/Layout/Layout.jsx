import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Layout = () => {
    return (
        <div className="flex flex-col">
            <Header logo={"https://songbegolf.com.vn/template/images/logo.svg"} />
            <main>
                <Outlet />
            </main>
            <Footer logo={"https://songbegolf.com.vn/template/images/logo.svg"} />
        </div>
    )
}

export default Layout