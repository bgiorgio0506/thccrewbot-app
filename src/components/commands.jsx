import React, { useState, } from 'react';
import settings from 'electron-settings';
import { ipcRenderer, } from 'electron';
//Schemas
import permissionSchema from '../schema/permissionConfig';


/**@todo use event for catching settings changes from outside */

const CreateCommand = () => {
    let initConfig = settings.getSync('config.commadConfig',);
    const [CommandConfig, setCommandConfig,]  = useState(initConfig,);

    function getPermissionsLabel (perm,) {
        let index = permissionSchema.indexOf(perm,);
        if (index !== -1) return permissionSchema[index].label;
        else return 'All';
    }

    //ipcRenderer event loop
    ipcRenderer.on('command-setting-changed',() => {
        setCommandConfig(settings.getSync('config.commadConfig',),);
        console.log('here',);
    },);


    return (<div className = "center-panel">
        <p className= 'section'>Command Dashboard</p>
        <div className = 'commandGrid'>
            <div>
                <p>Command</p>
            </div>
            <div>
                <p>Permissions</p>
            </div>
            <div>
                <p>Status</p>
            </div>
        </div>
        <div className="commandWrapper">
            {
                CommandConfig.commands.map((cmd,) => {
                    return (<div className= {'commandItem'} key={cmd.commandString}>
                        <div>
                            <p className= {'commandString-Label'}>{cmd.commandString}</p>
                        </div>
                        <div>
                            <p className= {'commandString-Label'}>{getPermissionsLabel(cmd.permissions,)}</p>
                        </div>
                        <div>
                            <p className= {(cmd.isCommandActive === true)?'commandString-status activeCmd' : 'commandString-status'}>{(cmd.isCommandActive === true) ? 'Active' : 'Disabled'}</p>
                        </div>
                        <div>
                            <i className="fas fa-trash-alt" style={{ fontSize : '15px', }} onClick={() => { console.log('cliecked',); }}></i>
                            <i className="fas fa-cog" style={{ fontSize : '15px', }} onClick={() => { console.log('clieck ed',); }}></i>
                        </div>
                    </div>);
                },)
            }
        </div>
        <div className={'controls'}>
            <div className ={'addCommand'} onClick={() => { console.log('clicked',); } }>
                <p className={'addButton'}>+</p>
            </div>
        </div>
    </div>);
};

export default CreateCommand;


//{JSON.stringify(cmd,)}
//onClick={() => { console.log('clicked',); } }
