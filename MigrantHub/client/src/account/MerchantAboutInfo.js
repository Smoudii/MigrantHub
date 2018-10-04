import React from 'react';
import FormComponent from './FormComponent'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const provinces = [
  { value: 'AB', label: 'Alberta' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland and Labrador' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'NT', label: 'Northwest Territories' },
  { value: 'NU', label: 'Nunavut' },
  { value: 'ON', label: 'Ontario' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'QC', label: 'Quebec' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'YT', label: 'Yukon' }
];

const organizationTypes = [
  { value : 'FDRL', label : 'Federal'},
  { value : 'PROV', label : "Provincial"},
  { value : 'NGOV', label : "Non-governmental"}
];
  
// https://www.canada.ca/en/government/dept.html
// https://libguides.smu.ca/govdoc/canada/departments
const federalDepartments = [
  { value : 'INDI', label : 'Indigenous and Northern Affairs Canada'},
  { value : 'AGRI', label : 'Agriculture and Agri-Food Canada'},
  { value : 'ATLA', label : 'Atlantic Canada Opportunities Agency'},
  { value : 'AUDI', label : 'Auditor General of Canada, Office of the'},
  { value : 'BANK', label : 'Bank of Canada'},
  { value : 'HOUS', label : 'Canada Mortgage and Housing Corporation'},
  { value : 'REVE', label : 'Canada Revenue Agency'},
  { value : 'HERE', label : 'Canadian Heritage'},
  { value : 'IMMI', label : 'Citizenship and Immigration Canada'},
  { value : 'EMPL', label : 'Employment and Social Development Canada'},
  { value : 'ENVR', label : 'Environment Canada'},
  { value : 'FINA', label : 'Finance Canada'},
  { value : 'FISH', label : 'Fisheries and Oceans Canada'},
  { value : 'GLOB', label : 'Global Affairs Canada'},
  { value : 'GGOV', label : 'Governor General of Canada'},
  { value : 'HLTH', label : 'Health Canada'},
  { value : 'INFR', label : 'Infrastructure Canada'},
  { value : 'INTR', label : 'Intergovernmental Affairs'},
  { value : 'JUST', label : 'Department of Justice'},
  { value : 'ARCH', label : 'Library and Archives Canada'},
  { value : 'ARMY', label : 'National Defence and the Canadian Armed Forces'},
  { value : 'PUBL', label : 'Public Works and Government Services Canada'},
  { value : 'STAT', label : 'Statistics Canada'},
  { value : 'TRAN', label : 'Transport Canada'},
  { value : 'TREA', label : 'Treasury Board of Canada'},
  { value : 'HUMN', label : 'Canadian Human Rights Commission'},
];
  
 // https://en.wikipedia.org/wiki/Departments_of_the_Quebec_Government
 // https://www.ontario.ca/page/ministries
 const provincialDepartments = [
   { value : '', label : ''},
   { value : '', label : ''},
   { value : '', label : ''},
   { value : '', label : ''},
   { value : '', label : ''},
   { value : '', label : ''},
   { value : '', label : ''},
 ];

const serviceTypes = [
  { value : '', type: ''},
  { value : '', type: ''},
  { value : '', type: ''},
  { value : '', type: ''},
  { value : '', type: ''},
];

class MerchantAboutInfo extends FormComponent {
  state = {
    organizationName: '',
    orgType: '',
    province: '',
    department: '',
    serviceType:'',
    description:''
  }

  render() {
    return (
      <React.Fragment>
      <Typography variant="title" gutterBottom>
        About
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="organizationName" 
            name="organizationName"
            label="Organization Name"
            value={this.state.organizationName}
            onChange={event => this.handleChange(event)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            id="orgType"
            name="orgType"
            select
            label="Organization Type"
            value={this.state.orgType}
            onChange={event => this.handleChange(event)}
            fullWidth
            helperText="Please select an organization type"
          >
            {organizationTypes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="province"
            name="province"
            select
            label="Province/Territory"
            value={this.state.province}
            onChange={event => this.handleChange(event)}
            fullWidth
            helperText="Please select a province/territory"
          >
            {provinces.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="department"
            name="department"
            select
            label="Department"
            value={this.state.department}
            onChange={event => this.handleChange(event)}
            fullWidth
            helperText="Please select a department"
          >
            {federalDepartments.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="serviceType"
            name="serviceType"
            select
            label="Service Type"
            value={this.state.serviceType}
            onChange={event => this.handleChange(event)}
            fullWidth
            helperText="Please select a service type"
          >
            {serviceTypes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description" 
            name="description"
            label="Description"
            value={this.state.description}
            onChange={event => this.handleChange(event)}
            fullWidth
          />
        </Grid>
      </Grid>
      </React.Fragment>
    );
  }
}

export default MerchantAboutInfo;
