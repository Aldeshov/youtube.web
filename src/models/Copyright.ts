import GameCopyright from "./GameCopyright"
import SongCopyright from "./SongCopyright"

export default interface Copyright {
    is_private: boolean;
    is_adult_content: boolean;
    is_kids_content: boolean;
    song_copyrights: SongCopyright[];
    game_copyrights: GameCopyright[];
}
