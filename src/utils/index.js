export const headers = () => {
    return {
        headers:{
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        }
    }
}