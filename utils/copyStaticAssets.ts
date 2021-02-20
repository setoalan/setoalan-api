import * as shell from 'shelljs';

shell.cp('-R', 'src/public', 'build/public');
shell.cp('-R', 'src/views', 'build/views');
