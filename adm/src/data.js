var full = {
    'patients':[{
        'name': 'Tan Ah Hua',
        'gender': 'Female',
        'nric': 'S1234567A'
    },{
        'name': 'Tan Ah Gao',
        'gender': 'Male',
        'nric': 'S1234567A',
        'alert': true,
        'selected': true
    },{
        'name': 'Tan Ah Bao',
        'gender': 'Male',
        'nric': 'S1234567A',
        'selected': true
    },{
        'name': 'Tan Ah Chao',
        'gender': 'Male',
        'nric': 'S1234567A',
        'selected':true
    },{
        'name': 'Tan Ah Mao',
        'gender': 'Male',
        'nric': 'S1234567A',
        'alert': true
    },{
        'name': 'Tan Ah Miang',
        'gender': 'Female',
        'nric': 'S1234567A'
    },{
        'name': 'Tan Ah Dao',
        'gender': 'Male',
        'nric': 'S1234567A'
    },{
        'name': 'Tan Ah Lian',
        'gender': 'Female',
        'nric': 'S1234567A'
    },{
        'name': 'Tan Ah Kow',
        'gender': 'Male',
        'nric': 'S1234567A'
    }]
};

var patient = {
    'info':{
        'Name':'Tan Ah Mao',
        'NRIC':'S1234567A',
        'Gender':'Male',
        'DOB':'01-01-1992',
        'BloodType':'O+',
        'Nationality / Race':'Singaporean Chinese',
        'Religion':'Christian',
        'Contact No':'81235123',
        'Address':'Blk 123, Ang Mo Kio Street 3, #04-56, Singapore 123123'
    },

    'visits':[{
        'date':'20160102',
        'time':'1415',
        'place':'ttsh',
        'state':'cancelled'
    },{
        'date':'20160201',
        'time':'0800',
        'place':'nuh',
        'state':'default'
    },{
        'date':'20160304',
        'time':'1030',
        'place':'ktph',
        'state':'actualized'
    },{
        'date':'20160315',
        'time':'1500',
        'place':'etfh'
    }],

    'doctors':[
        'FrancisAng(NUR)',
        'HoustonWong(CM)',
        'SiAoKow(DR)'
    ],

    'diagnosis':[{
        'date':'20150608',
        'text':'schizophrenia'
    },{
        'date':'20150910',
        'text':'bipolar disorder'
    },{
        'date':'20160218',
        'text':'alcohol abuse'
    },{
        'date':'20160630',
        'text':'adjustment disorder'
    }],

    'chat':[{
        'from':'Francis Ang (NUR)',
        'text':'Huston, I think there is a problem'
    },{
        'from':'Huston Wong (CM)',
        'text':'Really? How can you tell?'
    },{
        'from':'Francis Ang (NUR)',
        'text':'He has been muttering to himself lately'
    },{
        'from':'Francis Ang (NUR)',
        'text':'Might also be suffering from some sort of physical deflectment'
    },{
        'from':'Francis Ang (NUR)',
        'text':'*defectment'
    },{
        'from':'Huston Wong (CM)',
        'text':'What sort of physical defect? Anything obvious?'
    },{
        'from':'Francis Ang (NUR)',
        'text':'Yeah, his neck is permanantly on a 45 degree bend forward'
    },{
        'from':'Houston Wong (CM)',
        'text':'@SiAoKow(DR) can you make a diagnosis about this?'
    },{
        'from':'Si Ao Kow (DR)',
        'text':'The neck bend is probably due to the extensive phone usage'
    },{
        'from':'Si Ao Kow (DR)',
        'text':'I heard he got a bluetooth earpiece too. Explains the muttering'
    },{
        'from':'Francis Ang (NUR)',
        'text':'lolz'
    }],

    'docs':[{
        'name':'Houston Wong (CM)',
        'date':'20150229',
        'text':"Patient seemed fine on first look.\n\nSigns of delayed response (Slow response to auditory stimulus)\nTendency to repeat certain phrases (eg. addresses, instructions)\n\nPhysical abnormalities\n- Bulging eyes +lack of eyelids\n- Skin glows with a blue tint\n- Yellow strips of skin discoloration\n\nDiagnosis\nPatient appears to be suffering form STM, may be faking it though, refer to Finding Dory as reference case" 
    },{
        'name':'Francis Ang (NUR)',
        'date':'20150301',
        'text':"Patient seems fine on first look.\n\nSigns of hallucinations\n- Tendency to be over emotional over belongings (eg. figurines, toys)\n- Insist on hearing sounds from toys\n- Claims to have observed movement of objects otherwise uncapable of movement\n\nNo physical abnormalities (not abuse)\n\nDiagnosis\nPatient appears to have an overly active imagination, may have difficulty differentiating reality. Further observation needed, using Toy Story as reference case" 
    }]
};

var ownName = 'Si Ao Kow (DR)';
