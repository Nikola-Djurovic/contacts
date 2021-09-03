<template>
  <v-data-table
    :headers="headers"
    :items="contactdetails"
    sort-by="mobile"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>My Contacts</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Contact name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.mobile"
                      label="Personal mobile"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.landline"
                      label="Personal landline"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="Fax"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.fax"
                      label="Email"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
const axios = require('axios');
  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Contact name',
          align: 'start',
          value: 'name',
        },
        { text: 'Personal mobile', value: 'mobile' },
        { text: 'Personal landline', value: 'landline' },
        { text: 'Email', value: 'email' },
        { text: 'Fax', value: 'fax' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      contactdetails: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        mobile: 0,
        landline: 0,
        email: 0,
        fax: 0,
      },
      defaultItem: {
        name: '',
        mobile: 0,
        landline: 0,
        email: 0,
        fax: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      async initialize () {
        let res = await axios.get("http://localhost:9000/api/contacts/"+this.$store.getters.getOwnerId);
        this.contactdetails = res.data;
      },

      editItem (item) {
        this.editedIndex = this.contactdetails.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.contactdetails.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        axios.delete("http://localhost:9000/api/contacts/"+this.contactdetails[this.editedIndex]._id);
        this.closeDelete()
        this.contactdetails.splice(this.editedIndex, 1);
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

       async save () {
        if(this.editedItem.name.length > 20)
        {
          alert("Contact name is too long. Keep it under 20 characters.");
          return;
        }
        if(this.editedItem.name.length == 0)
        {
          alert("Contact name cannot be empty.");
          return;
        }
        if(this.editedItem.mobile.length > 15)
        {
          alert("Mobile length too long.");
          return;
        }
        if(this.editedItem.fax.length > 10)
        {
          alert("Fax length too long.");
          return;
        }
        if(this.editedItem.landline.length > 10)
        {
          alert("Landline length too long.");
          return;
        }
        if(this.editedItem.email.length > 20)
        {
          alert("Fax length too long.");
          return;
        }
        if (this.editedIndex > -1) {
          Object.assign(this.contactdetails[this.editedIndex], this.editedItem)
          console.log('http://localhost:9000/api/contacts/'+this.editedItem._id);
          axios.put('http://localhost:9000/api/contacts/'+this.editedItem._id, {
            name:this.editedItem.name,
            mobile:this.editedItem.mobile,
            landline:this.editedItem.landline,
            email:this.editedItem.email,
            fax:this.editedItem.fax,
            ownerId:this.editedItem.ownerId});
            
          } else {
            console.log("OvDE SAM"+this.$store.getters.getOwnerId);
          axios.post('http://localhost:9000/api/contacts/',{
            name:this.editedItem.name,
            mobile:this.editedItem.mobile,
            landline:this.editedItem.landline,
            email:this.editedItem.email,
            fax:this.editedItem.fax,
            ownerId:this.$store.getters.getOwnerId});
          this.contactdetails.push(this.editedItem)
        }
        let res = await axios.get("http://localhost:9000/api/contacts/"+this.$store.getters.getOwnerId);
        this.contactdetails = res.data;
        this.close()
      },
    },
  }
</script>