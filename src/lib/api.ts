export const apiUser={
    getUser:'/admin/users',
    deactivateUsers:(id:string)=>`/admin/users/${id}/deactivate`,
    activeUser:(id:string)=>`/admin/users/${id}/activate`
}

export const categoryApi={
    getAll:'/category',
    getAllsubcategory:(id:string)=>"/subcategory"+`?categoryId=${id}`,
    createCategory:'/category',
    createSubCategory:"/subcategory",
    createTag:"/tags"
}

export const meditationApis={
    create:'/meditation',
    getMediation:(id:string)=>`/meditation/${id}`,
    updateMeditaion:(id:string)=>`/meditation/${id}`,
    deleteMeditation:(id:string)=>`/meditation/${id}`
}