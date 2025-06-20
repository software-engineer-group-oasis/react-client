import db from '@/lib/db'
export async function POST(request) {
    const {id, name, email, phone} = await request.json()
    const [result] = await db.execute(
        'update renters set name=?, email=?,phone=? where renter_id=?',
        [name, email, phone, id]
    )
   
    if (result.affectedRows === 0) {
        return Response.json({
            code: 404,
            message: "Not Found"
        })
        
    }
    const [users] = (await db.execute(
        'select renter_id, name, phone, email from renters where renter_id=?', [id]
    ))
    return Response.json({
        code: 200,
        data: users[0]
    })
}