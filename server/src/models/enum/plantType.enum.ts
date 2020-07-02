export enum PlantTypeEnum {
  ARVORES = 'ARVORES',
  CACTOS_SUCULENTAS = 'CACTOS_SUCULENTAS',
  FLORES = 'FLORES',
  FRUTAS_LEGUMES = 'FRUTAS_LEGUMES'
}

export const getByPlantType = (plantType: string) => {
  switch (plantType) {
    case PlantTypeEnum.ARVORES:
      return PlantTypeEnum.ARVORES;
    case PlantTypeEnum.CACTOS_SUCULENTAS:
      return PlantTypeEnum.CACTOS_SUCULENTAS;
    case PlantTypeEnum.FLORES:
      return PlantTypeEnum.FLORES;
    case PlantTypeEnum.FRUTAS_LEGUMES:
      return PlantTypeEnum.FRUTAS_LEGUMES;
    default:
      return null;;
  }
}
