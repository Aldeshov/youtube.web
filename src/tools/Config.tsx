export const IP = "127.0.0.1"
export const PORT = 8000
export const PROD = false;

export const BASE_URL = PROD ? '' : `http://${IP}:${PORT}`

export const API_URL = PROD ? '/api' : '' // API - DJango Server

// export const DATE_PATTERN = "yyyy-MM-dd'T'hh:mm:ss.SSSSSS'Z'Z"
export function getDateTimePreview(date: string) {
    let createdDate = Date.parse(date)
    let now = Date.now()

    let timeDifference = now - createdDate
    if (timeDifference < 1000) {
        return "Just now"
    }

    let seconds = Math.floor(timeDifference / 1000)
    if (seconds < 60) {
        if (seconds === 1) {
            return "1 second ago"
        } else {
            return `${seconds} seconds ago`
        }
    }

    let minutes = Math.floor(seconds / 60)
    if (minutes < 60) {
        if (minutes === 1) {
            return "1 minute ago"
        } else {
            return `${minutes} minutes ago`
        }
    }

    let hours = Math.floor(minutes / 60)
    if (hours < 24) {
        if (hours === 1) {
            return "1 hour ago"
        } else {
            return `${hours} hours ago`
        }
    }

    let days = Math.floor(hours / 24)
    if (days < 31) {
        if (days === 1) {
            return "1 day ago"
        } else {
            return `${days} days ago`
        }
    }

    let months = Math.floor(days / 30)
    if (months < 12) {
        if (months === 1) {
            return "1 month ago"
        } else {
            return `${months} months ago`
        }
    }

    let years = Math.floor(months / 12)
    if (years === 1) {
        return "1 year ago"
    } else {
        return `${years} years ago`
    }
}