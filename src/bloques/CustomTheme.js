export default Blockly.Theme.defineTheme('themeDH', {
    'base': Blockly.Themes.Zelos,
    'categoryStyles': {
        'movement': {
            'colour': '#757bc8'
        },
        'pencil': {
            'colour': '#ff6b35'
        },
        'action': {
            'colour': '#219ebc'
        },
        'execute': {
            'colour': '#ff6392'
        }
        // 'background-color': colour
    },
    'blockStyles': {
        'movement_blocks': {
            'colourPrimary': '#757bc8',
            'colourTertiary':'#6065a3'
        },
        'execute_blocks': {
            'colourPrimary': '#ff6392',
            'colourTertiary':'#d45379'
        },
        "pencil_blocks": {
            'colourPrimary': "#ff6b35",
            'colourTertiary':'#d6592b'
        },
        "action_blocks": {
            "colourPrimary": "#219ebc",
            'colourTertiary':'#197a91'
        },
     },
    'componentStyles': {
        'toolboxForegroundColour': "white"
    },
    'fontStyle': {
        'family': "Arial, Helvetica, sans-serif",
        'weight': 'bold',
        'size': 10
    },
    // 'startHats': true
});
 