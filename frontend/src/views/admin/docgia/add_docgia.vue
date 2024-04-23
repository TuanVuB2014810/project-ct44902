<template>
    <div  class="page">
       <h4 class="text-center">Thêm đọc giả</h4>
       <DocgiaForm :docgia="docgia" @submit:docgia="adddocgia"></DocgiaForm>
       <p class="text-success">{{ message }}</p>
   </div>
</template>
<script>
   import DocgiaForm from "@/components/docgia/DocgiaForm.vue";
   import docgiaService from "@/services/docgia.service";
   export default {
       components: {
           DocgiaForm,
       },
       props: {
            id: {
                type: String,
                
            },
        },
       data(){
           return{
               docgia: null,
               message:"",
           };
       },
       methods:{
          
       
           async adddocgia(data){
               try{
                   
                   await docgiaService.create(data);
                   this.message ="Đọc giả được thêm thành công thành công."
               }catch(error){
                   console.log(error);
               }
           },
           
       },
      
};
   
</script>