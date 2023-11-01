export type CongratulationDataCongratsType = {
  title: string;
  color: string;
  audio: string;
  fill?: boolean;
};
export interface ICongratulationData {
  congrats: CongratulationDataCongratsType;
  credits: {
    title: string;
    designer: string;
    dev: string;
  };
}
export const CongratulationData: ICongratulationData = {
  congrats: {
    title: "FELICITATION",
    color: "bg-primary",
    audio: "/audios/0.mp3",
    fill: true,
  },
  credits: {
    title: "Crédits",
    designer: "Leo BARBOTIN",
    dev: "Enzo BACQUEYRISSES",
  },
};
