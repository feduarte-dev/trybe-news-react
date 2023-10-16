export type ProviderRecipesProps = {
  children: React.ReactNode;
};

export type ReportType = {
  data_publicacao: string;
  editorias: string;
  id: number;
  imagens: string;
  introducao: string;
  link: string;
  tipo: string;
  titulo: string;
};

export type CardPropsType = {
  card: ReportType;
};
