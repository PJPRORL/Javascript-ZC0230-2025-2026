// VERVANG DIT door het model van jouw project.
// Deze interface moet identiek zijn aan Frontend/src/models/item.ts.
// (Ja, twee keer hetzelfde bestand. Server en Frontend zijn losse projecten
//  met een eigen node_modules en eigen tsconfig; ze delen geen code, enkel JSON.)
export interface Item {
  id: string
  naam: string
  beschrijving: string
  aantal: number
}
