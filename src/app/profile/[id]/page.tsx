export default function userProfile({params}:any){
    return(
        <div>

            <h1>profile</h1>
            <hr />
            <p>ProfilePage
                <span>{params.id}</span></p>
        </div>
    )
}