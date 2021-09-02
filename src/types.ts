export interface House {
  /** The hypermedia URL of this resource */
  url: string;
  /** The name of this house */
  name: string;
  /** The region that this house resides in */
  region: string;
  /** Text describing the coat of arms of this house */
  coatOfArms: string;
  /** The words of this house*/
  words: string;
  /** The titles that this house holds*/
  titles: Array<string>;
  /** The seats that this house holds*/
  seats: Array<string>;
  /** The Character resource URL of this house's current lord*/
  currentLord: string;
  /** The Character resource URL of this house's heir*/
  heir: string;
  /** The House resource URL that this house answers to*/
  overlord: string;
  /** The year that this house was founded*/
  founded: string;
  /** The Character resource URL that founded this house*/
  founder: string;
  /** The year that this house died out*/
  diedOut: string;
  /** An array of names of the noteworthy weapons that this house owns */
  ancestralWeapons: Array<string>;
  /** An array of House resource URLs that was founded from this house */
  cadetBranches: Array<string>;
  /**  An array of Character resource URLs that are sworn to this house*/
  swornMembers: Array<string>;
}

interface HasName {
  name: string;
}

export interface HouseWithMetadata {
  house: null | House;
  swornMembers: Array<any>;
  cadetBranches: Array<any>;
  currentLord: HasName;
  overlord: HasName;
  heir: HasName;
  founder: HasName;
}

export interface HasHouseWithMetadata {
  houseWithMetadata: HouseWithMetadata;
}

export const mkInitialHouseMetadata = (): HouseWithMetadata => ({
  house: null,
  swornMembers: [],
  cadetBranches: [],
  currentLord: { name: "Unknown" },
  overlord: { name: "Unknown" },
  heir: { name: "Unknown" },
  founder: { name: "Unknown" },
});
