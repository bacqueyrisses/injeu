export interface ICodesData {
  id: number;
  title: string;
  color: string;
  audio: string;
  secondAudio?: string;
  hint?: string;
  secret?: number;
  group: number;
  fill?: boolean;
}
export const CodesData: ICodesData[] = [
  {
    id: 11,
    title: "RADIO",
    color: "bg-injeu-light-gray",
    audio: "/audios/RADIO.mp4",
    secondAudio: "/audios/RADIO_2.mp4",
    hint: "/audios/RADIO_INDICE.mp3",
    secret: 5879,
    group: 1,
    fill: true,
  },
  {
    id: 22,
    title: "AGENDA",
    color: "bg-injeu-light-green",
    audio: "/audios/AGENDA.mp4",
    secondAudio: "/audios/AGENDA_2.mp4",
    hint: "/audios/AGENDA_INDICE.mp3",
    secret: 3746,
    group: 1,
  },
  {
    id: 33,
    title: "BOBINE",
    color: "bg-injeu-light-blue",
    audio: "/audios/BOBINE.mp4",
    secondAudio: "/audios/BOBINE_2.mp4",
    hint: "/audios/BOBINE_INDICE.mp3",
    secret: 2416,
    group: 1,
  },
  {
    id: 44,
    title: "CHAUSSON",
    color: "bg-injeu-brown",
    audio: "/audios/CHAUSSON.mp4",
    secondAudio: "/audios/CHAUSSON_2.mp4",
    hint: "/audios/CHAUSSON_INDICE.mp3",
    secret: 2006,
    group: 1,
  },
  {
    id: 55,
    title: "CREME",
    color: "bg-injeu-blue",
    audio: "/audios/CREME.mp4",
    group: 1,
  },
  {
    id: 66,
    title: "PARTITION",
    color: "bg-injeu-light-red",
    audio: "/audios/PARTITION.mp3",
    secondAudio: "/audios/PARTITION_2.mp4",
    hint: "/audios/PARTITION_INDICE.mp3",
    secret: 1200,
    group: 2,
  },
  {
    id: 77,
    title: "FOULARD",
    color: "bg-injeu-pop-green",
    audio: "/audios/RADIO.mp4",
    secondAudio: "/audios/RADIO.mp4",
    hint: "/audios/PARTITION_INDICE.mp3",
    secret: 1550,
    group: 2,
  },
  {
    id: 88,
    title: "COUTEAU",
    color: "bg-injeu-gray",
    audio: "/audios/COUTEAU.mp4",
    secondAudio: "/audios/COUTEAU_2.mp4",
    hint: "/audios/COUTEAU_INDICE.mp3",
    secret: 4335,
    group: 2,
  },
  {
    id: 99,
    title: "PORTE CLEF",
    color: "bg-injeu-purple",
    audio: "/audios/PORTECLEF.mp3",
    secondAudio: "/audios/PORTE-CLEF_2.mp3",
    hint: "/audios/PORTECLEF_INDICE.mp3",
    secret: 2400,
    group: 2,
  },
  {
    id: 10,
    title: "CHEQUIER",
    color: "bg-injeu-dark-yellow",
    audio: "/audios/CHEQUIER.mp3",
    group: 2,
    fill: true,
  },
  {
    id: 999,
    title: "PORTE CLEF",
    color: "bg-injeu-purple",
    audio: "/audios/PORTE-CLEF.mp4",
    secondAudio: "/audios/PORTE-CLEF_2.mp3",
    hint: "/audios/PORTECLEF_INDICE.mp3",
    secret: 1313,
    group: 3,
  },
  {
    id: 1234567890,
    title: "MYSTERE",
    color: "bg-black",
    audio: "/audios/MYSTERE.mp3",
    secondAudio: "/audios/MYSTERE.mp3",
    hint: "/audios/MYSTERE_INDICE.mp3",
    secret: 2539,
    group: 4,
  },
];
