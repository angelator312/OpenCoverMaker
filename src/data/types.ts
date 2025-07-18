import { TypeEnum } from "./enums";

export type ILineEditsGroup =
  | IVerseLineEditsGroup
  | IChorusLineEditsGroup
  | IBridgeLineEditsGroup
  | ICommentLineEditsGroup
  | IIntroLineEditsGroup
  | IOutroLineEditsGroup
  | IPrechorusLineEditsGroup
  | ITagLineEditsGroup
  | IVerseLineEditsGroup;

interface IBaseLineEditsGroup {
  originalLyrics: string;
  newLyrics: string;
  type: TypeEnum;
  args: any;
}

interface IVerseLineEditsGroup extends IBaseLineEditsGroup {
  type: TypeEnum.Verse;
  args: ArgsOnVerse;
}

interface IChorusLineEditsGroup extends IBaseLineEditsGroup {
  type: TypeEnum.Chorus;
  args: ArgsOnChorus;
}

interface IBridgeLineEditsGroup extends IBaseLineEditsGroup {
  type: TypeEnum.Bridge;
  args: ArgsOnBridge;
}

interface IPrechorusLineEditsGroup extends IBaseLineEditsGroup {
  type: TypeEnum.Prechorus;
  args: ArgsOnPrechorus;
}

interface IIntroLineEditsGroup extends IBaseLineEditsGroup {
  type: TypeEnum.Intro;
  args: ArgsOnIntro;
}

interface IOutroLineEditsGroup extends IBaseLineEditsGroup {
  type: TypeEnum.Outro;
  args: ArgsOnOutro;
}

interface ITagLineEditsGroup extends IBaseLineEditsGroup {
  type: TypeEnum.Tag;
  args: ArgsOnTag;
}

interface ICommentLineEditsGroup extends IBaseLineEditsGroup {
  type: TypeEnum.Comment;
  args: ArgsOnComment;
}
type ArgsOnVerse = [number, string];
type ArgsOnChorus = [number, string];
type ArgsOnBridge = [];
type ArgsOnPrechorus = [number, string];
type ArgsOnIntro = [];
type ArgsOnOutro = [];
// [tag name]
type ArgsOnTag = [string];
// [comment]
type ArgsOnComment = [string];
