export const apiUser={
    getUser:'/admin/users',
    deactivateUsers:(id:string)=>`/admin/users/${id}/deactivate`,
    activeUser:(id:string)=>`/admin/users/${id}/activate`
}