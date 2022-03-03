export default function ConvertToJson(location: any){
    Object.keys(location).forEach((key) => {
        try {
          location[key] = JSON.parse(location[key])
        } catch {
          location[key] = location[key]
        }
      })
}