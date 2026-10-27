export interface FestivalOrder {
  id: number;
  tableName: string; // e.g. "Şenlik Masası", "Gözleme Masası", "Büyük Masa"
  dishName: string; // e.g. "Geleneksel Su Böreği", "Ispanaklı Köy Gözlemesi"
  targetArea: number; // in cm²
  targetRadius: number; // in cm (since A = 3 * r²)
  dialogueIntro: string; // Merve Hanım's welcoming speech
  dialogueSuccess: string; // Merve Hanım's praise
  hintText: string; // e.g. "75 cm² alan için önce 3'e böl (25), sonra karesi 25 olan sayıyı bul (5 cm)!"
  tableIcon: string;
  tableColor: string;
}

export interface FlourParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}
