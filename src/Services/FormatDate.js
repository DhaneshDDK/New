export const formatDate = (dateString) => {
    // console.log(dateString)
    const options = { year: "numeric", month: "long", day: "numeric" }
    const date = new Date(dateString)
    const formattedDate = date.toLocaleDateString("en-US", options)
  
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const period = hour >= 12 ? "PM" : "AM"
    const formattedTime = `${hour % 12}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`
  
    return `${formattedDate} | ${formattedTime}`
  }

export const formatTime = (time)=>{

  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = Math.floor((time % 3600) % 60)

    return `${parseInt(hours)}h ${parseInt(minutes)}m ${parseInt(seconds)}s`;
}