import { supabase } from "~/supabase";
export async function authenticate({email,password}){
    try {
        const { data, error } = await supabase.from('profiles').select('email').eq('email', email).eq('password',password);
        if (error) throw new Error(error.message);
        console.log("####### data-services.js ########  authenticate #########");
        console.log(data);
        return data;
      } catch (err) {
        console.error('Error authenticating admin:', err);
      }
}







// submit student addmission form
// Insert new staff with image upload
// async function insertNewStudent({formData}) {
//     try {
//       // let imageUrl = ''; 
//       if (uploadedImage.value) {
//         const { data, error } = await supabase.storage
//           .from('staff-images')
//           .upload(`${uploadedImage.value.name}`, uploadedImage.value);
//         if (error) throw new Error(error.message);
//         // imageUrl = data.path;
//       }
//       const { error: insertError } = await supabase.from('staff').insert([{ ...newStaff.value, image_url: (supabaseStorageUrl+`/staff-images/${uploadedImage.value.name}`) }]);
//       if (insertError) throw new Error(insertError.message);
//       insertDialog.value = false;
//       fetchStaffs();
//     } catch (err) {
//       console.error('Error inserting staff:', err);
//     }
//   }