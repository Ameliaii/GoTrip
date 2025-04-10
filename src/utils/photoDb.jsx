import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";

// Define database structure
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
    const existingPhoto = await db.photos.get(id);
    if (existingPhoto) {
      await db.photos.update(id, { imgSrc });
      console.log(`Photo updated successfully, ID: ${id}`);
    } else {
      await db.photos.add({
        id: id,
        imgSrc: imgSrc,
      });
      console.log(`New photo added successfully, ID: ${id}`);
    }
  } catch (error) {
    console.log(`Failed to save photo: ${error}`);
  }
}

export function getBookingPhotoSrc(id) {
  try {
    // Use timestamp as query parameter to force refresh of query results
    const timestamp = Date.now();
    const img = useLiveQuery(() => {
      console.log(`Querying photo, ID: ${id}, timestamp: ${timestamp}`);
      return db.photos.where("id").equals(id).toArray();
    }, [id, timestamp]);
    
    if (Array.isArray(img) && img.length > 0) {
      console.log(`Photo found, ID: ${id}`);
      return img[0].imgSrc;
    }
    console.log(`No photo found, ID: ${id}`);
    return null;
  } catch (error) {
    console.error(`Failed to get photo: ${error}`);
    return null;
  }
}
