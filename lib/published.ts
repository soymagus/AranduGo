import { getDb } from "@/db";
import { siteProfiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { demoData, normalizeSiteData, type SiteData } from "@/lib/site-data";

export async function getPublished(): Promise<SiteData> {
  try {
    const [row] = await getDb().select().from(siteProfiles).where(eq(siteProfiles.id, "demo")).limit(1);
    return row ? normalizeSiteData(JSON.parse(row.publishedJson)) : demoData;
  } catch {
    return demoData;
  }
}
