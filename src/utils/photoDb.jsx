import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";

// 定义数据库结构
class BookingPhotoDB extends Dexie {
  constructor() {
    super("booking-photos");
    this.version(1).stores({
      photos: "id",
    });
    this.photos = this.table("photos");
  }
}

export const db = new BookingPhotoDB();

export async function addBookingPhoto(id, imgSrc) {
  try {
    await db.photos.add({
      id: id,
      imgSrc: imgSrc,
    });
  } catch (error) {
    console.log(`保存照片失败: ${error}`);
  }
}

export function getBookingPhotoSrc(id) {
  const img = useLiveQuery(() => db.photos.where("id").equals(id).toArray());
  if (Array.isArray(img) && img.length > 0) {
    return img[0].imgSrc;
  }
  return null;
}
