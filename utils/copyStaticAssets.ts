import * as shell from 'shelljs';

shell.rm('-rf', 'build');
shell.mkdir('-p', 'build/public');
shell.cp('-R', 'public', 'build');
