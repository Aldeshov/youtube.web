import Channel from "./Channel"
import Copyright from "./Copyright"

export default interface VideoContent {
    code: string;
    title: string;
    created_on: string;
    is_verified: boolean;
    video: string;
    views: string;
    likes: number;
    dislikes: number;
    preview: string;
    type: number;
    description: string;
    on_channel: Channel;
    copyrights: Copyright;
}