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
    creators: string[];
    dev: string;
  };
}
export const CongratulationData: ICongratulationData = {
  congrats: {
    title: "FELICITATION",
    color: "bg-primary",
    audio: "/audios/OUTRO.mp4",
    fill: true,
  },
  credits: {
    title: "Crédits",
    creators: ["Olga Descloud", "Zoé Arnaud", "Leo Barbotin"],
    dev: "Enzo Bacqueyrisses",
  },
};
