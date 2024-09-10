<template>
  <v-app>
    <v-container>
      <v-icon>mdi-account-multiple</v-icon> &nbsp; Staffs / Teachers

      <v-spacer />

      <!-- Staff List -->
      <v-card flat>
        <v-card-title class="d-flex align-center pe-2">
          <!-- New Item Button -->
          <v-btn class="mb-2" color="primary" dark @click="openInsertDialog">
            +Add
          </v-btn>
          <v-spacer />
          <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
            variant="solo-filled" flat hide-details single-line />
        </v-card-title>

        <!-- Insert Dialog -->
        <v-dialog v-model="insertDialog" max-width="600px">
          <v-card>
            <v-card-title>New Staff Application Form</v-card-title>
            <v-card-text>
              <v-text-field v-model="newStaff.name" label="Name" />
              <v-select v-model="newStaff.gender" label="Gender" hint="Enter your sex" :items="genderLookUp"
                persistent-hint />
              <v-text-field v-model="newStaff.contact_mobile" label="Contact" />
              <v-autocomplete color="white" hide-no-data hide-selected v-model="newStaff.subjects_taught"
                :items="subjectLookups" hint="Pick the subjects you teach" label="Subject Taught" multiple
                persistent-hint />
              <v-select v-model="newStaff.classes_taught" :items="classLookups" hint="Pick the classes you teach"
                label="Classes Taught" multiple persistent-hint />
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue-darken-1" text @click="insertDialog = false">Cancel</v-btn>
              <v-btn color="blue-darken-1" text @click="insertNewStaff">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>


        <!-- Data Table -->
        <v-data-table v-model:search="search" :headers="headers" :items="items" :search="search"
          :items-per-page="itemsPerPage">
          <template #item.actions="{ item }">
            <v-icon class="me-2" size="small" @click="openEditDialog(item)">
              mdi-pencil
            </v-icon>
            <v-icon size="small" @click="openDeleteDialog(item)">
              mdi-delete
            </v-icon>
          </template>

          <template #no-data>
            <v-btn color="primary" @click="fetchStaffs"> Reset </v-btn>
          </template>
        </v-data-table>

        <!-- Edit Dialog -->
        <v-dialog v-model="editDialog" max-width="600px">
          <v-card>
            <v-card-title>Edit Staff</v-card-title>
            <v-card-text>
              <v-text-field v-model="editStaff.name" label="Name" />
              <v-text-field v-model="editStaff.gender" label="Gender" />
              <v-text-field v-model="editStaff.contact_mobile" label="Contact" />
              <v-text-field v-model="editStaff.subjects_taught" label="Subjects Taught" />
              <v-text-field v-model="editStaff.classes_taught" label="Classes Taught" />
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue-darken-1" text @click="editDialog = false">Cancel</v-btn>
              <v-btn color="blue-darken-1" text @click="updateStaff(editStaff.id)">Update</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Delete Dialog -->
        <v-dialog v-model="deleteDialog" max-width="600px">
          <v-card>
            <v-card-title>Confirm Delete</v-card-title>
            <v-card-text>Are you sure you want to delete this staff member?</v-card-text>
            <v-card-actions>
              <v-btn color="blue-darken-1" text @click="deleteDialog = false">Cancel</v-btn>
              <v-btn color="blue-darken-1" text @click="deleteStaff(deleteStaffId)">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '~/supabase'; // Adjust path based on your project structure

const search = ref('');
const items = ref([]); // Initialize as an array to avoid invalid prop warning
const itemsPerPage = ref(2);

// Lookups for dropdowns
const genderLookUp = ['Male', 'Female', 'Others'];
// const subjectLookup = ['Math', 'Language', 'Geography', 'Sociology', 'Economy', 'Physics', 'Chemistry', 'Biology'];
const subjectLookups = ref([]);
const classLookups = ref([]);
// const classLookups = ['Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X', 'Class XI', 'Class XII'];

// Table headers based on Supabase `staff` table
const headers = [
  { title: 'SL', value: 'id', key: 'id' },
  { title: 'Name', value: 'name' },
  { title: 'Gender', value: 'gender' },
  { title: 'Contact', value: 'contact_mobile' },
  { title: 'Subjects Taught', value: 'subjects_taught' },
  { title: 'Classes Taught', value: 'classes_taught' },
  { title: 'Actions', key: 'actions', sortable: false },
];

// Dialog states
const insertDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);

// New staff data
const newStaff = ref({
  name: '',
  gender: '',
  contact_mobile: '',
  subjects_taught: [],
  classes_taught: []
});

// Fetch staff data from Supabase
async function fetchStaffs() {
  try {
    const { data, error } = await supabase
      .from('staff')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }

    // Ensure items is updated with fetched data
    items.value = data || [];
  } catch (err) {
    console.error('Error fetching staff data:', err);
  }
}

// Fetch subject lookups from Supabase
async function fetchSubjectLookups() {
  try {
    const { data, error } = await supabase
      .from('subject_lookup')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }

    // Ensure classLookups is updated with fetched data
    subjectLookups.value = data.map(item => item.subject_name) || [];
  } catch (err) {
    console.error('Error fetching class lookup data:', err);
  }
}


// Fetch class lookups from Supabase
async function fetchClassLookups() {
  try {
    const { data, error } = await supabase
      .from('class_lookup')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }

    // Ensure classLookups is updated with fetched data
    classLookups.value = data.map(item => item.class_name) || [];
  } catch (err) {
    console.error('Error fetching class lookup data:', err);
  }
}
// const classLookups = ref([]); // New variable to hold class lookups

// async function fetchClassesLookups() {
//   try {

//     const { data, error } = await supabase
//       .from('class_lookup')
//       .select('*')


//     if (error) {
//       throw new Error(error.message);
//     }

//     // Assign fetched data to `classLookups`
//     classLookups.value = data || [];
//   } catch (err) {
//     console.error('Error fetching class lookup data:', err);
//   }
// }


// Insert new staff
async function insertNewStaff() {
  try {
    const { error } = await supabase
      .from('staff')
      .insert([newStaff.value]);

    if (error) {
      throw new Error(error.message);
    }

    insertDialog.value = false;
    fetchStaffs();
  } catch (err) {
    console.error('Error inserting staff data:', err);
  }
}

// Update staff
async function updateStaff(staffId) {
  try {
    const { error } = await supabase
      .from('staff')
      .update(editStaff.value)
      .eq('id', staffId);

    if (error) {
      throw new Error(error.message);
    }

    editDialog.value = false;
    fetchStaffs();
  } catch (err) {
    console.error('Error updating staff data:', err);
  }
}

// Delete staff
async function deleteStaff(staffId) {
  try {
    const { error } = await supabase
      .from('staff')
      .delete()
      .eq('id', staffId);

    if (error) {
      throw new Error(error.message);
    }

    deleteDialog.value = false;
    fetchStaffs();
  } catch (err) {
    console.error('Error deleting staff data:', err);
  }
}

// Staff to edit/delete
const editStaff = ref(null);
const deleteStaffId = ref(null);

// Open dialogs
function openInsertDialog() {
  newStaff.value = {
    name: '',
    gender: '',
    contact_mobile: '',
    subjects_taught: [],
    classes_taught: []
  };
  insertDialog.value = true;
}

function openEditDialog(item) {
  editStaff.value = { ...item };
  editDialog.value = true;
}

function openDeleteDialog(item) {
  deleteStaffId.value = item.id;
  deleteDialog.value = true;
}

onMounted(() => {
  fetchStaffs();
  fetchClassLookups(); // Fetch class lookups on mount
});
</script>
