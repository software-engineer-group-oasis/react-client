import db from '@/lib/db'

export async function POST(request) {
    const {id, name, email, phone} = await request.json()
    console.log(id, name, email, phone)
    const [result] = await db.execute(
        'update seller_contacts set name=?, email=?, phone=? where contact_id=?',
        [name, email, phone, id]
    )
    if (result.affectedRows === 0) {
        return Response.json({
            code: 404,
            message: "Not Found"
        })
    }
    const [users] = (await db.execute(
        'select contact_id, name, phone, email from seller_contacts where contact_id=?', [id]
    ))
    return Response.json({
        code: 200,
        data: users[0]
    })
}