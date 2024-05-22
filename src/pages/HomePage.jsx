import Header from "../components/Header";
import LinkTable from "../components/LinkTable";

function HomePage(params) {
    return(
        <div className="home">
            <Header/>
            <div className="home-body">
                <LinkTable />
            </div>
        </div>
    )
}

export default HomePage;