import db from "@/lib/db"
import {formatPropertyRow} from '@/lib/util'

export async function GET() {
    const queryString = `
    select
        p.property_id as _id,
        p.name as name,
        p.type as type,
        l.province as province,
        l.city as city,
        l.address as address,
        pi.image_url as image,
        p.monthly_rate as monthly_rate
    from
        properties p join property_images pi on p.property_id = pi.property_id
        join locations l on p.location_id=l.location_id
        join seller_contacts sc on p.seller_contact_id=sc.contact_id
    where pi.sort_order=0
    `
    try {
        // 解构赋值， db.query返回格式为[dataRows, metadata]
        const [rows] = await db.query(queryString)
        const returnData = rows.map(row => formatPropertyRow(row))
        return Response.json({
            data: returnData
        })
    } catch(error) {
        return Response.json({
            error: 'database error',
            status: 500
        })
    }
}