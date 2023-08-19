set export

DEVCONTAINER := ".devcontainer"

default:
  just --list

run-dev-server:
    just server/run-dev

run-dev-site:
    just website/run-dev

setup-dev-container: copy-to-container setup-zsh-environment

initialize-dev-container: copy-git-config-from-outside-container set-environment

[private]
set-environment:
    #!/bin/zsh

    ENVIRONMENT_FILE="$DEVCONTAINER/.zshenv"

    rm -rf $ENVIRONMENT_FILE
    touch $ENVIRONMENT_FILE

    echo "export LC_ALL=C" >> $ENVIRONMENT_FILE
    echo "export USER=$USER" >> $ENVIRONMENT_FILE

[private]
setup-zsh-environment:
    #!/bin/zsh

    if [ ! -f ~/.oh-my-zsh/oh-my-zsh.sh ]
    then
        echo "Installing Oh My Zsh"
        sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
    fi

    if [ ! -d ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions ]
    then
        echo "Installing zsh-autosuggestions"
        git clone https://github.com/zsh-users/zsh-autosuggestions ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions
    fi

    if [ ! -d ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting ]
    then
        echo "Installing zsh-syntax-highlighting"
        git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ~/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting
    fi

    echo "Updating zsh configuration"
    cp -f $DEVCONTAINER/.zshrc ~/.zshrc
    cp -f $DEVCONTAINER/.zshenv ~/.zshenv

[private]
copy-git-config-from-outside-container:
    #!/bin/zsh

    cp -f ~/.gitconfig $DEVCONTAINER/.gitconfig

[private]
copy-to-container:
    #!/bin/zsh

    cp -f $DEVCONTAINER/.gitconfig ~/.gitconfig
