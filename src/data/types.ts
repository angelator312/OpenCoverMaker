import { TypeEnum, GenreEnum } from "./enums";

export interface ILineEditsGroup {
  originalLyrics: string;
  newLyrics: string;
  type: TypeEnum;
  args: ArgTypes[];
}

export interface SongDetails {
  originalLyrics: string;
  newLyrics: string;
  newArtist: string;
  newSongName: string;
  newGenre: GenreEnum;
  originalArtist: string;
  originalSongName: string;
  URLForLyrics: string;
  key: string;
}

// interface IVerseLineEditsGroup extends IBaseLineEditsGroup {
//   // type: TypeEnum.Verse;
//   args: ArgsOnVerse;
// }

// interface IChorusLineEditsGroup extends IBaseLineEditsGroup {
//   // type: TypeEnum.Chorus;
//   args: ArgsOnChorus;
// }

// interface IBridgeLineEditsGroup extends IBaseLineEditsGroup {
//   // type: TypeEnum.Bridge;
//   args: ArgsOnBridge;
// }

// interface IPrechorusLineEditsGroup extends IBaseLineEditsGroup {
//   // type: TypeEnum.Prechorus;
//   args: ArgsOnPrechorus;
// }

// interface IIntroLineEditsGroup extends IBaseLineEditsGroup {
//   // type: TypeEnum.Intro;
//   args: ArgsOnIntro;
// }

// interface IOutroLineEditsGroup extends IBaseLineEditsGroup {
//   // type: TypeEnum.Outro;
//   args: ArgsOnOutro;
// }

// interface ITagLineEditsGroup extends IBaseLineEditsGroup {
//   // type: TypeEnum.Tag;
//   args: ArgsOnTag;
// }

// interface ICommentLineEditsGroup extends IBaseLineEditsGroup {
//   // type: TypeEnum.Comment;
//   args: ArgsOnComment;
// }
type ArgsOnVerse = [number, string];
type ArgsOnChorus = [number, string];
type ArgsOnBridge = [];
type ArgsOnPrechorus = [number, string];
type ArgsOnIntro = [];
type ArgsOnOutro = [];
// [tag name]
type ArgsOnTag = [string] | string[];
// [comment]
type ArgsOnComment = [string];

export type ArgTypes = string | number;

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

// export type ArgsFromTypeEnum<T> =
// T extends TypeEnum.Verse?ArgsOnVerse:
// (T extends TypeEnum.Chorus?ArgsOnChorus:
//   (T extends TypeEnum.Bridge?ArgsOnBridge:
//     (T extends TypeEnum.Prechorus?ArgsOnPrechorus:
//       (T extends TypeEnum.Intro?ArgsOnIntro:
//         (T extends TypeEnum.Outro?ArgsOnOutro:
//           (T extends TypeEnum.Tag?ArgsOnTag:
//             (T extends TypeEnum.Comment?ArgsOnComment:
//             never
//             )
//           )
//         )
//       )
//     )
//   )
// )
