export function formatPropertyRow(row) {
  return {
    ...row,
    location: {
      province: row.province,
      city: row.city,
      address: row.address
    },
    images: [row.image],
    rates: {
      monthly: row.monthly_rate
    }
  };
}