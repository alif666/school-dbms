<template>
  <v-app>
    <v-container>


      <!-- Staff List -->
      <v-card flat>
        <v-card-title class="d-flex align-center pe-2">
          <v-icon>mdi-account-multiple</v-icon> &nbsp; Staffs / Teachers

          <v-spacer />

          <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
            variant="solo-filled" flat hide-details single-line />

        </v-card-title>

        <!-- New Item Button -->
        <v-btn class="mb-2" color="primary" dark @click="openInsertDialog">
          +Add
        </v-btn>

        <!-- Insert Dialog -->
        <v-dialog v-model="insertDialog" max-width="600px">
          <v-card>
            <v-card-title>New Staff</v-card-title>
            <v-card-text>
              <v-text-field v-model="newStaff.name" label="Name"></v-text-field>
              <v-text-field v-model="newStaff.gender" label="Gender"></v-text-field>
              <v-text-field v-model="newStaff.contact_mobile" label="Contact"></v-text-field>
              <v-text-field v-model="newStaff.subjects_taught" label="Subjects Taught"></v-text-field>
              <v-text-field v-model="newStaff.classes_taught" label="Classes Taught"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue-darken-1" text @click="insertDialog = false">Cancel</v-btn>
              <v-btn color="blue-darken-1" text @click="insertNewStaff">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <suspense v-on:fallback="{ VSkeletonLoader }">
          <v-data-table v-model:search="search" :headers="headers" :items="items" item-key="id"
            :items-per-page-options="paginationOptions" :items-per-page="itemsPerPage"
            :sort-by="[{ key: 'classesTaught', order: 'asc' }]">



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
        </suspense>
        <!-- Edit/Delete Dialogs -->
        <v-dialog v-model="editDialog" max-width="600px">
          <v-card>
            <v-card-title>Edit Staff</v-card-title>
            <v-card-text>
              <v-text-field v-model="editStaff.name" label="Name"></v-text-field>
              <v-text-field v-model="editStaff.gender" label="Gender"></v-text-field>
              <v-text-field v-model="editStaff.contact_mobile" label="Contact"></v-text-field>
              <v-text-field v-model="editStaff.subjects_taught" label="Subjects Taught"></v-text-field>
              <v-text-field v-model="editStaff.classes_taught" label="Classes Taught"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue-darken-1" text @click="editDialog = false">Cancel</v-btn>
              <v-btn color="blue-darken-1" text @click="updateStaff(editStaff.id)">Update</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

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
import { VSkeletonLoader } from 'vuetify/components';
import { supabase } from '~/supabase'; // Adjust path based on your project structure

const search = ref('');
const items = ref([]);
const paginationOptions = [2, 3];
const itemsPerPage = ref(2);

// Dialog states
const insertDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);

// New staff data
const newStaff = ref({
  name: '',
  gender: '',
  contact_mobile: '',
  subjects_taught: '',
  classes_taught: ''
});

// Staff to edit/delete
const editStaff = ref(null);
const deleteStaffId = ref(null);

// Headers based on Supabase `staff` table
const headers = [
  { title: 'Name', value: 'name' },
  { title: 'Gender', value: 'gender' },
  { title: 'Contact', value: 'contact_mobile' },
  { title: 'Subjects Taught', value: 'subjects_taught' },
  { title: 'Classes Taught', value: 'classes_taught' },
  { title: 'Actions', key: 'actions', sortable: false },
];

// Fetch data from Supabase
async function fetchStaffs() {
  try {
    const { data, error } = await supabase
      .from('staff')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }

    items.value = data;
  } catch (err) {
    console.error('Error fetching staff data:', err);
  }
}

// Insert new staff
async function insertNewStaff() {
  try {
    const { data, error } = await supabase
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
    const { data, error } = await supabase
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
    const { data, error } = await supabase
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

// Open dialogs
function openInsertDialog() {
  newStaff.value = {
    name: '',
    gender: '',
    contact_mobile: '',
    subjects_taught: '',
    classes_taught: ''
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
});
</script>

// const items = [
// {
// id: 1,
// firstName: 'John',
// lastName: 'Doe',
// designation: 'Mathematics Teacher',
// subjectsTaught: 'Mathematics, Physics',
// classesTaught: 'Secondary, Higher Secondary',
// qualification: 'M.Sc., B.Ed.',
// contact: '+91 9876543210',
// typeOfAppointment: 'Regular',
// dateOfJoining: '01/06/2015',
// },
// {
// id: 2,
// firstName: 'Jane',
// lastName: 'Smith',
// designation: 'English Teacher',
// subjectsTaught: 'English, Literature',
// classesTaught: 'Upper Primary, Secondary',
// qualification: 'M.A., B.Ed.',
// contact: '+91 9876543220',
// typeOfAppointment: 'Contract',
// dateOfJoining: '15/07/2018',
// }
// {
// id: 3,
// firstName: 'David',
// lastName: 'Brown',
// designation: 'Science Teacher',
// subjectsTaught: 'Biology, Chemistry',
// classesTaught: 'Secondary',
// qualification: 'M.Sc., B.Ed.',
// contact: '+91 9876543230',
// typeOfAppointment: 'Part-Time',
// dateOfJoining: '10/09/2020',
// },
// ]
