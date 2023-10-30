export interface ICodesData {
  id: number;
  title: string;
  color: string;
  audio: string;
  hint: string;
  secret: number;
  group: number;
  fill?: boolean;
}
export const CodesData: ICodesData[] = [
  {
    id: 11,
    title: "RADIO",
    color: "bg-injeu-light-gray",
    audio: "/audios/0.mp3",
    hint: "/audios/0.mp3",
    secret: 5879,
    group: 1,
    fill: true,
  },
  {
    id: 22,
    title: "AGENDA",
    color: "bg-injeu-light-green",
    audio: "/audios/0.mp3",
    hint: "/audios/0.mp3",
    secret: 3746,
    group: 1,
  },
  {
    id: 33,
    title: "BOBINE",
    color: "bg-injeu-light-blue",
    audio: "/audios/0.mp3",
    hint: "/audios/0.mp3",
    secret: 2416,
    group: 1,
  },
  {
    id: 44,
    title: "CHAUSSON",
    color: "bg-injeu-brown",
    audio: "/audios/0.mp3",
    hint: "/audios/0.mp3",
    secret: 2006,
    group: 1,
  },
  {
    id: 66,
    title: "PARTITION",
    color: "bg-injeu-light-red",
    audio: "/audios/0.mp3",
    hint: "/audios/0.mp3",
    secret: 1200,
    group: 2,
  },
  {
    id: 77,
    title: "FOULARD",
    color: "bg-injeu-pop-green",
    audio: "/audios/0.mp3",
    hint: "/audios/0.mp3",
    secret: 1550,
    group: 2,
  },
  {
    id: 88,
    title: "COUTEAU",
    color: "bg-injeu-gray",
    audio: "/audios/0.mp3",
    hint: "/audios/0.mp3",
    secret: 4335,
    group: 2,
  },
  {
    id: 99,
    title: "PORTE CLEF",
    color: "bg-injeu-purple",
    audio: "/audios/0.mp3",
    hint: "/audios/0.mp3",
    secret: 2400,
    group: 2,
  },
];
