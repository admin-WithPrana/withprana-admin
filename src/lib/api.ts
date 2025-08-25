export const apiUser={
    getUser:'/admin/users',
    deactivateUsers:(id:string)=>`/admin/users/${id}/deactivate`,
    activeUser:(id:string)=>`/admin/users/${id}/activate`
}

export const categoryApi={
    getAll:'/category',
    getAllsubcategory:"/subcategory",
    createCategory:'/category',
    createSubCategory:"/subcategory",
    createTag:"/tags"
}

export const meditationApis={
    create:'/meditation',
    getMediation:(id:string)=>`/meditation/${id}`
}