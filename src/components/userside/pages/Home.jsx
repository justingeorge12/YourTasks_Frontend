import Nav from "../Layout/Nav"

function Home(){

    return(
        <div>
            <div>
                <Nav />
            </div>
            <div className="bg-gradient-to-br from-pink-50  to-fuchsia-300  h-screen opacity-70 ">
                <div className="justify-center flex items-center h-screen">
                    <div>
                        <h1 className="text-4xl font-black text-center">
                            Best Task Mangement system for 2025
                        </h1>
                        <div>
                        Manage your tasks efficiently with the most effective task management software in 2025.
                        </div>
                        <div>
                            <div className="mt-4 font-semibold">
                                ➖ Efficient Task Assignment 
                            </div>
                            <div className="mt-4 font-semibold">
                                ➖ Real-Time Progress Tracking for Better Productivity
                            </div>
                            <div className="mt-4 font-semibold">
                                ➖ Customizable Task Views to Fit Any Workflow
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="bg-pink-100 h-screen">
                next
            </div> */}
        </div>
    )
}

export default Home