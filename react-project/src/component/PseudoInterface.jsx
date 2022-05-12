interface PseudoRules {
    rule?: string;
    acceptedRules?: string[];
    magnitude?: number[];
    amount?: number;
}

export function createPseudoModPool(){

    const RESISTANCE_INFO: PseudoRules[] = [
        {
            rule: '+#% total to Fire Resistance',
            acceptedRules: [
                '#% to Fire Resistance',
                '#% to Fire and Cold Resistances',
                '#% to Fire and Lightning Resistances',
                '#% to Fire and Chaos Resistances',
                '#% to all Elemental Resistances'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '+#% total to Cold Resistance',
            acceptedRules: [
                '#% to Cold Resistance',
                '#% to Fire and Cold Resistances',
                '#% to Cold and Lightning Resistances',
                '#% to Cold and Chaos Resistances',
                '#% to all Elemental Resistances'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '+#% total to Lightning Resistance',
            acceptedRules: [
                '#% to Lightning Resistance',
                '#% to Cold and Lightning Resistances',
                '#% to Fire and Lightning Resistances',
                '#% to Lightning and Chaos Resistances',
                '#% to all Elemental Resistances'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '+#% total to Chaos Resistance',
            acceptedRules: [
                '#% to Chaos Resistance',
                '#% to Cold and Chaos Resistances',
                '#% to Fire and Chaos Resistances',
                '#% to Lightning and Chaos Resistances'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '+#% total to all Elemental Resistances',
            acceptedRules: [
                '#% to all Elemental Resistances'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        }
    ];

    const ATTRIBUTE_INFO: PseudoRules[] = [
        {
            rule: '+# total to all Attributes',
            acceptedRules: [
                '# to all Attributes'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '+# total to Strength',
            acceptedRules: [
                '# to all Attributes',
                '# to Strength',
                '# to Strength and Intelligence',
                '# to Strength and Dexterity'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '+# total to Dexterity',
            acceptedRules: [
                '# to all Attributes',
                '# to Dexterity and Intelligence',
                '# to Strength and Dexterity'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '+# total to Intelligence',
            acceptedRules: [
                '# to all Attributes',
                '# to Intelligence',
                '# to Strength and Intelligence',
                '# to Dexterity and Intelligence'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        }
    ]
    
    const GLOBAL_DEFENCE_INFO: PseudoRules[] = [
        {
            rule: '+# total maximum Life',
            acceptedRules: [
                '# to all Attributes',
                '# to Strength',
                '# to Strength and Intelligence',
                '# to Strength and Dexterity',
                '# to maximum Life'
            ],
            magnitude: [
                .5,.5,.5,.5,1
            ],
            amount: 0
        },
        {
            rule: '+# total maximum Mana',
            acceptedRules: [
                '# to all Attributes',
                '# to Strength and Intelligence',
                '# to Dexterity and Intelligence',
                '# to Intelligence',
                '# to maximum Mana'
            ],
            magnitude: [
                .5,.5,.5,.5,1
            ],
            amount: 0
        },
        {
            rule: '#% total increased maximum Energy Shield',
            acceptedRules: [
                '#% increased maximum Energy Shield'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '+# total maximum Energy Shield',
            acceptedRules: [
                '# to maximum Energy Shield'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '# Life Regenerated per Second',
            acceptedRules: [
                'Regenerate # Life per second'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '#% of Life Regenerated per Second',
            acceptedRules: [
                'Regenerate #% of Life per second'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '#% increased Mana Regeneration Rate',
            acceptedRules: [
                '#% increased Mana Regeneration Rate'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '#% of Physical Attack Damage Leeched as Life',
            acceptedRules: [
                '#% of Physical Attack Damage Leeched as Life'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '#% of Physical Attack Damage Leeched as Mana',
            acceptedRules: [
                '#% of Physical Attack Damage Leeched as Mana'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        }
        
    ]

    const GLOBAL_OFFENCE_INFO: PseudoRules[] = [
        {
            rule: '+#% total Attack Speed',
            acceptedRules: [
                '#% increased Attack Speed'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '+#% total Cast Speed',
            acceptedRules: [
                '#% increased Cast Speed'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '#% total increased Physical Damage',
            acceptedRules: [
                '#% increased Physical Damage',
                '#% increased Global Physical Damage'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '+#% Global Critical Strike Chance',
            acceptedRules: [
                '#% increased Global Critical Strike Chance'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '#% increased Movement Speed',
            acceptedRules: [
                '#% increased Movement Speed'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '+#% total Critical Strike Chance for Spells',
            acceptedRules: [
                '#% increased Critical Strike Chance for Spells',
                '#% increased Global Critical Strike Chance'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '+#% Global Critical Strike Multiplier',
            acceptedRules: [
                '#% to Global Critical Strike Multiplier'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '#% increased Elemental Damage',
            acceptedRules: [
                '#% increased Elemental Damage'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '#% increased Elemental Damage with Attack Skills',
            acceptedRules: [
                '#% increased Elemental Damage with Attack Skills',
                '#% increased Elemental Damage'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '#% increased Lightning Damage',
            acceptedRules: [
                '#% increased Elemental Damage',
                '#% increased Lightning Damage'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '#% increased Cold Damage',
            acceptedRules: [
                '#% increased Elemental Damage',
                '#% increased Cold Damage'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '#% increased Fire Damage',
            acceptedRules: [
                '#% increased Elemental Damage',
                '#% increased Fire Damage'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '#% increased Spell Damage',
            acceptedRules: [
                '#% increased Spell Damage'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '#% increased Lightning Spell Damage',
            acceptedRules: [
                '#% increased Elemental Damage',
                '#% increased Spell Damage',
                '#% increased Lightning Damage'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '#% increased Cold Spell Damage',
            acceptedRules: [
                '#% increased Elemental Damage',
                '#% increased Spell Damage',
                '#% increased Cold Damage'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '#% increased Fire Spell Damage',
            acceptedRules: [
                '#% increased Elemental Damage',
                '#% increased Spell Damage',
                '#% increased Fire Damage'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        },
        {
            rule: '#% increased Burning Damage',
            acceptedRules: [
                '#% increased Elemental Damage',
                '#% increased Burning Damage',
                '#% increased Fire Damage'
            ],
            magnitude: [
                1,1,1,1,1
            ],
            amount: 0
        }

    ]

    //Make this global
    return([RESISTANCE_INFO,ATTRIBUTE_INFO,GLOBAL_DEFENCE_INFO,GLOBAL_OFFENCE_INFO]);
}
