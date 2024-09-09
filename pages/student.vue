<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :search="search"
    :items-per-page="itemsPerPage"
    :pagination-options="paginationOptions"
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>My CRUD</v-toolbar-title>
        <v-divider class="mx-4" inset vertical/>
        <v-spacer/>
        <v-btn class="mb-2" color="primary" dark @click="openInsertDialog">
          New Staff
        </v-btn>
        <!-- Insert Dialog -->
        <v-dialog v-model="insertDialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">New Staff</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="newStaff.name" label="Name" />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="newStaff.gender" label="Gender" />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="newStaff.contact_mobile" label="Contact" />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="newStaff.subjects_taught" label="Subjects Taught" />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="newStaff.classes_taught" label="Classes Taught" />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="insertDialog = false">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="insertNewStaff">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        
        <!-- Edit Dialog -->
        <v-dialog v-model="editDialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Edit Staff</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="editStaff.name" label="Name" />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="editStaff.gender" label="Gender" />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="editStaff.contact_mobile" label="Contact" />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="editStaff.subjects_taught" label="Subjects Taught" />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="editStaff.classes_taught" label="Classes Taught" />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="editDialog = false">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="updateStaff(editStaff.id)">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        
        <!-- Delete Dialog -->
        <v-dialog v-model="deleteDialog" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="deleteDialog = false">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteStaff(deleteStaffId)">
                OK
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
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
