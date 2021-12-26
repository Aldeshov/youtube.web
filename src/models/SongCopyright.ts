export default interface SongCopyright {
    key: number;
    is_allowable: boolean;
    accept_monetization: boolean;
    tags: string[];
    song: string;
    artist: string;
    album: string;
    licensed_to: string;
}
